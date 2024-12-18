import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaWindowClose } from "react-icons/fa";
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import '../visitor/CssFiles/CreateVisit.css';
import logo from '../img/logopr.png'
import sl from '../img/sl.png'


const CreateVisit = ({ isOpen, onClose, refreshList, visitorId }) => {
    const [visitorDetails, setVisitorDetails] = useState(null);
    const [checkoutTime, setCheckoutTime] = useState('');
    const [duration, setDuration] = useState(null);
    const componentRef = React.useRef();

    useEffect(() => {
        if (isOpen && visitorId) {
            getVisitorDetails(visitorId);
        }
    }, [isOpen, visitorId]);

    useEffect(() => {
        if (visitorDetails && visitorDetails.timeOfVisit) {
            let duration = 0;
            if (checkoutTime) {
                const checkInTime = visitorDetails.timeOfVisit.split(':').slice(0, 2).join(':'); // Extracting hours and minutes
                let checkOutTime = checkoutTime;
                if (checkOutTime < checkInTime) {
                    // If check-out is earlier than check-in, assume next day visit
                    const nextDay = new Date(`01/02/2000 ${checkOutTime}`);
                    checkOutTime = `${nextDay.getHours()}:${nextDay.getMinutes()}`;
                }
                const checkOutDate = new Date(`01/01/2000 ${checkOutTime}`);
                const checkInDate = new Date(`01/01/2000 ${checkInTime}`);
                duration = Math.round((checkOutDate - checkInDate) / (1000 * 60));
            }
            setDuration(Math.abs(duration)); // Take absolute value to ensure it's always positive
        }
    }, [visitorDetails, checkoutTime]);


    const getVisitorDetails = async (visitorId) => {
        try {
            const response = await axios.get(`http://localhost:3500/api/visitor/${visitorId}`);
            setVisitorDetails(response.data);
        } catch (error) {
            console.error('Error fetching visitor details:', error.message);
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    // Function to handle printing
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    // Function to handle visit submission
    const visitSubmit = async () => {
        if (!checkoutTime) {
            toast.error('Please enter checkout time', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return; // Prevent submission if checkout time is empty
        }

        try {
            // Make an HTTP POST request to save the visit details
            const response = await axios.post('http://localhost:3500/api/visit/add', {
                visitorName: `${visitorDetails.firstName} ${visitorDetails.lastName}`,
                nic: visitorDetails.nic,
                inmateNo: visitorDetails.inmateNo,
                dateOfVisit: formatDate(visitorDetails.dateOfVisit),
                checkInTime: visitorDetails.timeOfVisit,
                checkOutTime: checkoutTime,
                duration: checkoutTime ? duration : null // Set duration as null if checkout time is empty
            });
            console.log(response.message);

            // Trigger printing of PDF upon successful visit submission
            handlePrint();
            onClose();
            // Optionally, you can show a toast notification for successful submission
            toast.success('Visit details saved successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            console.error('Error saving visit details:', error.message);
            // Optionally, you can show a toast notification for error
            toast.error('Error saving visit details', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    return (
        <div className={`custom-modal-overlay ${isOpen ? 'custom-sec-show' : 'custom-sec-hide'}`}>
            <div className="custom-modal-container">
                <FaWindowClose size={25} color='red' onClick={onClose} className="custom-close-icon" />
                {visitorDetails ? (
                    <div>
                        <div className='custom-width' ref={componentRef} style={{ padding: '20px' }}>
                            <div style={{ width: '100%', display: 'flex', gap: '2px', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                                    <img width={100} height={150} src={sl} alt="logo" />
                                    <img width={150} height={150} src={logo} alt="logo" />
                                </div>
                                <h1 style={{ fontFamily: 'cursive', marginBottom: '5px' }}>Sri Lanka Prison Department</h1>
                                <p style={{ marginBottom: '10px' }}>_____________________________________________________________________________________________________________</p>
                            </div>
                            <h1 className="custom-heading">Visit Details</h1>
                            <div className='custom-flex-container'>
                                <div className='custom-info'>
                                    <p className="custom-label">Full Name</p>
                                    <p>{visitorDetails.firstName.charAt(0).toUpperCase() + visitorDetails.firstName.slice(1)} {visitorDetails.lastName.charAt(0).toUpperCase() + visitorDetails.lastName.slice(1)}</p>
                                </div>
                                <div className='custom-info'>
                                    <p className="custom-label">NIC</p>
                                    <p>{visitorDetails.nic}</p>
                                </div>
                                <div className='custom-info'>
                                    <p className="custom-label">Inmate Number</p>
                                    <p>{visitorDetails.inmateNo}</p>
                                </div>
                                <div className='custom-info'>
                                    <p className="custom-label">Date of Visit</p>
                                    <p>{formatDate(visitorDetails.dateOfVisit)}</p>
                                </div>
                                <div className='custom-info'>
                                    <p className="custom-label">Check In Time</p>
                                    <p>{visitorDetails.timeOfVisit}</p>
                                </div>
                                <div className='custom-info'>
                                    <label className="custom-label">Check Out Time</label>
                                    <input type="time" value={checkoutTime} onChange={(e) => setCheckoutTime(e.target.value)} />
                                </div>
                                <div className='custom-info'>
                                    <p className="custom-label">Duration Of Visit</p>
                                    <p>{duration !== null ? `${duration} mins` : 'N/A'}</p>
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
                        <div className='custom-button-container'>
                            <button onClick={visitSubmit} className='custom-button'>Save & Print</button>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}

export default CreateVisit;
