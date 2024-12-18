import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaWindowClose, FaUserCircle } from "react-icons/fa";
import { useReactToPrint } from 'react-to-print';
import './ViewSecurityStaff.css';
import logo from '../img/logopr.png'
import sl from '../img/sl.png'

const ViewSecurityStaff = ({ isOpen, onClose, refreshList, staffId }) => {
    const [staffDetails, setStaffDetails] = useState(null);
    const componentRef = React.useRef();

    useEffect(() => {
        if (isOpen && staffId) {
            getStaffDetails(staffId);
        }
    }, [isOpen, staffId]);

    const getStaffDetails = async (staffId) => {
        try {
            const response = await axios.get(`http://localhost:3500/api/securityStaff/${staffId}`);
            setStaffDetails(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching staff details:', error.message);
        }
    }

    const formatDateOfBirth = (dob) => {
        const date = new Date(dob);
        return date.toLocaleDateString();
    }

    // Function to handle printing
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className={`modal-overlay ${isOpen ? 'sec-show' : 'sec-hide'}`}>
            <div className="modal-container">
                <FaWindowClose size={25} color='red' onClick={onClose} className="close-icon" />
                {staffDetails ? (
                    <div className="staff-details" ref={componentRef}>
                        <div style={{ width: '100%', display: 'flex', gap: '2px', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                                <img width={100} height={150} src={sl} alt="logo" />
                                <img width={150} height={150} src={logo} alt="logo" />
                            </div>
                            <h1 style={{ fontFamily: 'cursive', marginBottom: '2px' }}>Sri Lanka Prison Department</h1>
                            <p style={{ marginBottom: '1px' }}>_____________________________________________________________________________________________________________</p>
                        </div>
                        <h2 className="">Security Member</h2>
                        <p className='staff-icon'><FaUserCircle size={30} /></p>
                        {/* Display Personal Information */}
                        <div >
                            <div className='personal-info'>
                                <h2 style={{ alignItems: 'center', textAlign: 'center' }}>Personal Information </h2>
                                <div className='personal-details' style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, auto)', gap: '5px' }}>
                                    <p><strong>First Name:</strong> {staffDetails.firstName}</p>
                                    <p><strong>Last Name:</strong> {staffDetails.lastName}</p>
                                    <p><strong>Date of Birth:</strong> {formatDateOfBirth(staffDetails.dateOfBirth)}</p>
                                    <p><strong>Gender:</strong> {staffDetails.gender}</p>
                                    <p><strong>NIC:</strong> {staffDetails.nic}</p>
                                    <p><strong>Phone:</strong> {staffDetails.phone}</p>
                                    <p><strong>Marital Status:</strong> {staffDetails.maritalStatus}</p>
                                    <p><strong>Religion:</strong> {staffDetails.religion}</p>
                                </div>


                            </div>
                            <div className='personal-info'>
                                <h2 style={{ alignItems: 'center', textAlign: 'center' }}>Qualifications </h2>
                                <div className='personal-details'>
                                    <p><strong>Educatioal Background:</strong> {staffDetails.educationalBackground}</p>
                                    <p><strong>Certifications:</strong> {staffDetails.certification}</p>
                                    <p><strong>Completed Courses:</strong> {staffDetails.completedCourses}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px', marginTop: '25px' }}>

                                <p style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                    <strong>Signature:</strong>
                                    <span>.................</span>
                                </p>
                                <p style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                    <strong>Date:</strong>
                                    <span>................</span>
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
                <div className='flex justify-end'>
                    <button onClick={handlePrint} className='print-button' style={{backgroundColor: 'red'}}>Print</button>
                </div>
            </div>
        </div>
    );
}

export default ViewSecurityStaff;
