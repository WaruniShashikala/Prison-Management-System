import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaWindowClose } from "react-icons/fa";
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import './CssFiles/AllViews.css';
import logo from '../img/logopr.png'
import sl from '../img/sl.png'

const VisitorDetails = ({ isOpen, onClose, refreshList, visitorId }) => {
    const [visitorDetails, setVisitorDetails] = useState(null);
    const componentRef = React.useRef();

    useEffect(() => {
        if (isOpen && visitorId) {
            getVisitorDetails(visitorId);
        }
    }, [isOpen, visitorId]);

    const getVisitorDetails = async (visitorId) => {
        try {
            const response = await axios.get(`http://localhost:3500/api/visitor/${visitorId}`);
            setVisitorDetails(response.data);
        } catch (error) {
            console.error('Error fetching visitor details:', error.message);
        }
    }

    const handleDelete = async () => {
        if (!visitorId) return; // Ensure visitorId is available
        if (!window.confirm("Are you sure you want to delete?")) return; // Confirm deletion
        try {
            await axios.delete(`http://localhost:3500/api/visitor/delete/${visitorId}`);
            console.log('Visitor deleted successfully');
            toast.success('Visitor Successfully Deleted ', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            onClose(); // Close the visitor details modal after deletion

            refreshList(); // Refresh the list of visitors
        } catch (error) {
            console.error('Error deleting visitor:', error);
        }
    };

    const formatDateOfBirth = (dob) => {
        const date = new Date(dob);
        return date.toLocaleDateString();
    }

    const formatDateOfVisit = (dateOfVisit) => {
        return dateOfVisit.substring(0, 10);
    }

    // Function to handle printing
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });



    return (
        <div className={`v-modal-overlay ${isOpen ? 'v-sec-show' : 'v-sec-hide'}`}>
            <div className="v-modal-container" >
                <FaWindowClose size={25} color='red' onClick={onClose} className="v-close-icon" />
                {visitorDetails ? (
                    <div className=''>
                        <div ref={componentRef} style={{ padding: '10px' }}>
                            <div style={{ width: '100%', display: 'flex', gap: '2px', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                                    <img width={100} height={150} src={sl} alt="logo" />
                                    <img width={150} height={150} src={logo} alt="logo" />
                                </div>
                                <h1 style={{ fontFamily: 'cursive', marginBottom: '5px' }}>Sri Lanka Prison Department</h1>
                                <p style={{ marginBottom: '10px' }}>_____________________________________________________________________________________________________________</p>
                            </div>
                            <h1 className="mb-4 text-xl font-bold text-center">Visitor Details</h1>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div className='v-details'>
                                    <p><strong>First Name:</strong> {visitorDetails.firstName}</p>
                                    <p><strong>Last Name:</strong> {visitorDetails.lastName}</p>
                                    <p><strong>Date of Birth:</strong> {formatDateOfBirth(visitorDetails.dateOfBirth)}</p>
                                    <p><strong>Gender:</strong> {visitorDetails.gender}</p>
                                    <p><strong>NIC:</strong> {visitorDetails.nic}</p>
                                    <p><strong>Email:</strong> {visitorDetails.email}</p>
                                    <p><strong>Contact Number:</strong> {visitorDetails.contactNumber}</p>
                                </div>
                                <div className='v-details'>
                                    <p><strong>Inmate Number:</strong> {visitorDetails.inmateNo}</p>
                                    <p><strong>Inmate Name:</strong> {visitorDetails.inmateName}</p>
                                    <p><strong>Date of Visit:</strong> {formatDateOfVisit(visitorDetails.dateOfVisit)}</p>
                                    <p><strong>Time of Visit:</strong> {visitorDetails.timeOfVisit}</p>
                                    <p><strong>Purpose of Visit:</strong> {visitorDetails.purposeOfVisit}</p>
                                </div>

                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px', marginTop: '25px' }}>
                                <p style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                    <strong>Prison Guard Name:</strong>
                                    <span>.................</span>
                                </p>
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
                        <div style={{ display: 'flex', gap: '10px', justifyContent: "space-around", marginTop: "20px" }}>
                            <button onClick={handlePrint} className='v-print-button' style={{ backgroundColor: 'red' }}>Print</button>
                            <button onClick={handleDelete} className='v-print-button'>Delete</button>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}

export default VisitorDetails;
