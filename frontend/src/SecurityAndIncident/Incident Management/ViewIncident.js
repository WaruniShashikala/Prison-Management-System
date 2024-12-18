import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaWindowClose } from "react-icons/fa";
import { useReactToPrint } from 'react-to-print';
import logo from '../../img/logopr.png'
import sl from '../../img/sl.png'

const ViewIncident = ({ isOpen, onClose, refreshList, incidentId }) => {
    const [incidentDetails, setIncidentDetails] = useState(null);
    const [dateOfReport, setDateOfReport] = useState(null); // State to store today's date
    const componentRef = React.useRef();

    useEffect(() => {
        if (isOpen && incidentId) {
            getIncidentDetails(incidentId);
        }
        // Set today's date when the component mounts
        const today = new Date();
        setDateOfReport(today.toLocaleDateString());
    }, [isOpen, incidentId]);

    const getIncidentDetails = async (incidentId) => {
        try {
            const response = await axios.get(`http://localhost:3500/api/incident/${incidentId}`);
            setIncidentDetails(response.data);
        } catch (error) {
            console.error('Error fetching incident details:', error.message);
        }
    }

    // Function to handle printing
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className={`modal-overlay ${isOpen ? 'sec-show' : 'sec-hide'}`}>
            <div className="modal-container">
                <FaWindowClose size={25} color='red' onClick={onClose} className="close-icon" />
                {incidentDetails ? (
                    <div>
                        <div style={{ padding: 4 }} ref={componentRef}>
                            <div style={{ width: '100%', display: 'flex', gap: '2px', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                                    <img width={100} height={150} src={sl} alt="logo" />
                                    <img width={150} height={150} src={logo} alt="logo" />
                                </div>
                                <h1 style={{ fontFamily: 'cursive', marginBottom: '5px' }}>Sri Lanka Prison Department</h1>
                                <p style={{ marginBottom: '10px' }}>_____________________________________________________________________________________________________________</p>
                            </div>
                            <h2 style={{ textAlign: 'center' }}>Incident Details</h2>
                            {/* Display Incident Information */}
                            <div style={{ margin: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
                                    <p><strong>Reported By:</strong> {incidentDetails.reportedBy}</p>
                                    <p><strong>Date of Report:</strong> {dateOfReport}</p> {/* Display today's date */}
                                </div>
                                <p><strong>Report Number:</strong> {incidentDetails.reportNumber}</p>
                                <div>
                                    <h3 style={{ marginTop: '20px' }}>Incident Informations</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', paddingTop: '10px', marginBottom: '20px', width: '100%' }}>
                                        <p><strong>Incident Type:</strong> {incidentDetails.incidentType}</p>
                                        <p><strong>Date of Incident:</strong> {new Date(incidentDetails.dateOfIncident).toLocaleDateString()}</p>
                                        <p><strong>Incident Location:</strong> {incidentDetails.location}</p>
                                        <p><strong>Time of Incident:</strong> {incidentDetails.time}</p> {/* This seems to be incorrect. You might want to replace it with the actual time of the incident. */}
                                    </div>

                                </div>
                                <p><strong>Description</strong></p>
                                <p> {incidentDetails.description}</p>
                                <div>
                                    <h3 style={{ marginBottom: '20px', fontSize: '1.25rem', fontWeight: '600', marginTop: '20px' }}>Inmate of Incident Involved</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', width: '100%' }}>
                                        {incidentDetails.inmateNumber && <p><strong>Inmate Number:</strong> {incidentDetails.inmateNumber}</p>}
                                        {incidentDetails.inmateName && <p><strong>Inmate Name:</strong> {incidentDetails.inmateName}</p>}
                                    </div>
                                    <p style={{ marginTop: '10px' }}><strong>Follow up Action</strong> </p>
                                    <p> {incidentDetails.action}</p>
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
                        </div>
                        <div>
                            <button onClick={handlePrint} className='print-button' style={{ backgroundColor: 'red' }}>Print</button>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default ViewIncident;
