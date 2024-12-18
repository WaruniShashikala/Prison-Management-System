import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaWindowClose } from "react-icons/fa";
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import '../css/AllViews.css';
import logo from '../../img/logopr.png';
import sl from '../../img/sl.png';

const ViewTraining = ({ isOpen, onClose, refreshList, trainingId }) => {
    const [trainingDetails, setTrainingDetails] = useState(null);
    const componentRef = React.useRef();

    useEffect(() => {
        if (isOpen && trainingId) {
            getTrainingDetails(trainingId);
        }
    }, [isOpen, trainingId]);

    const getTrainingDetails = async (trainingId) => {
        try {
            const response = await axios.get(`http://localhost:3500/api/vocationaltraining/${trainingId}`);
            setTrainingDetails(response.data);
        } catch (error) {
            console.error('Error fetching training details:', error.message);
        }
    }

    const handleDelete = async () => {
        if (!trainingId) return; // Ensure trainingId is available
        if (!window.confirm("Are you sure you want to delete?")) return; // Confirm deletion
        try {
            await axios.delete(`http://localhost:3500/api/vocationaltraining/delete/${trainingId}`);
            console.log('Training deleted successfully');
            toast.success('Training Successfully Deleted ', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            onClose(); // Close the training details modal after deletion
            refreshList(); // Refresh the list of trainings
        } catch (error) {
            console.error('Error deleting training:', error);
        }
    };

    // Function to handle printing
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className={`r-add-incident-overlay ${isOpen ? 'r-inci' : 'r-inci-hide'}`}>
            <div className="r-modal-container"  >
                <FaWindowClose size={25} color='red' onClick={onClose} className="r-close-icon" />
                {trainingDetails ? (
                    <div>
                        <div className='w-[400px]' ref={componentRef} style={{ padding: '10px' }}>
                            <div style={{ width: '100%', display: 'flex', gap: '2px', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                                    <img width={100} height={150} src={sl} alt="logo" />
                                    <img width={150} height={150} src={logo} alt="logo" />
                                </div>
                                <h1 style={{ fontFamily: 'cursive', marginBottom: '5px' }}>Sri Lanka Prison Department</h1>
                                <p style={{ marginBottom: '10px' }}>_____________________________________________________________________________________________________________</p>
                            </div>
                            <h1 className="mb-4 text-xl font-bold text-center">Training Details</h1>

                            <div className='r-details'>
                                <p><strong>Training Name:</strong> {trainingDetails.trainingName}</p>
                                <p><strong>Vocational Field:</strong> {trainingDetails.vocationalField}</p>
                                <p><strong>Date:</strong> {new Date(trainingDetails.date).toLocaleDateString()}</p>
                                <p><strong>Time:</strong> {trainingDetails.time}</p>
                                <p><strong>Location:</strong> {trainingDetails.location}</p>
                                <p><strong>Duration (Hours):</strong> {trainingDetails.durationHours}</p>
                                <p><strong>Lead Instructor:</strong> {trainingDetails.leadInstructor}</p>
                                <p><strong>Max Participants:</strong> {trainingDetails.maxParticipants}</p>
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
                        <div style={{ display: 'flex', gap: '10px', justifyContent: "space-around", marginTop: "20px" }}>
                            <button onClick={handlePrint} className='r-print-button' style={{ backgroundColor: 'red' }}>Print</button>
                            <button onClick={handleDelete} className='r-print-button'>Delete</button>
                        </div>

                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default ViewTraining;
