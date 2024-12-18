import React from 'react';
import './AddIncident.css';

const Qualifications = ({ securityStaffData, handleChange, errors }) => {
    return (
        <div>
            <h3 className=''>Qualifications</h3>
            <form>
                <div className="add-sec-div">
                    <label className="">Educational Background:</label>
                    <div>
                        <input type="text" name="educationalBackground" value={securityStaffData.educationalBackground} onChange={handleChange} className={`border ${errors.educationalBackground ? 'border-red-500' : 'border-gray-300'} form-input`} />
                        {errors.educationalBackground && <span className="add-incident-eroor">{errors.educationalBackground}</span>}
                    </div>
                </div>

                <div className="add-sec-div">
                    <label className="text-gray-700">Certification:</label>
                    <div>
                        <input type="text" name="certification" value={securityStaffData.certification} onChange={handleChange} className={`border ${errors.certification ? 'border-red-500' : 'border-gray-300'} form-input`} />
                        {errors.certification && <span className="add-incident-eroor">{errors.certification}</span>}
                    </div>
                </div>

                <div className="add-sec-div">
                    <label className="text-gray-700">Completed Courses:</label>
                    <div>
                        <textarea name="completedCourses" value={securityStaffData.completedCourses.join("\n")} onChange={handleChange} className={`border ${errors.completedCourses ? 'border-red-500' : 'border-gray-300'} form-input`} />
                        {errors.completedCourses && <span className="add-incident-eroor">{errors.completedCourses}</span>}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Qualifications;
