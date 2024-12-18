import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaWindowClose } from "react-icons/fa";
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import '../css/AllViews.css';
import logo from '../../img/logopr.png';
import sl from '../../img/sl.png';

const ViewEducation = ({ isOpen, onClose, refreshList, educationId }) => {
    const [educationDetails, setEducationDetails] = useState(null);
    const componentRef = React.useRef();

    useEffect(() => {
        if (isOpen && educationId) {
            getEducationDetails(educationId);
        }
    }, [isOpen, educationId]);

    const getEducationDetails = async (educationId) => {
        try {
            const response = await axios.get(`http://localhost:3500/api/education/${educationId}`);
            setEducationDetails(response.data);
        } catch (error) {
            console.error('Error fetching education details:', error.message);
        }
    }

    const handleDelete = async () => {
        if (!educationId) return; // Ensure educationId is available
        if (!window.confirm("Are you sure you want to delete?")) return; // Confirm deletion
        try {
            await axios.delete(`http://localhost:3500/api/education/delete/${educationId}`);
            console.log('Education deleted successfully');
            toast.success('Education Successfully Deleted ', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            onClose(); // Close the education details modal after deletion
            refreshList(); // Refresh the list of educations
        } catch (error) {
            console.error('Error deleting education:', error);
        }
    };

    // Function to handle printing
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className={`r-add-incident-overlay ${isOpen ? 'r-inci' : 'r-inci-hide'}`}>
            <div className="r-modal-container" >
                <FaWindowClose size={25} color='red' onClick={onClose} className="r-close-icon" />
                {educationDetails ? (
                    <div>
                        <div className='w-[400px]' ref={componentRef} style={{padding: '10px'}}>
                            <div style={{ width: '100%', display: 'flex', gap: '2px', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                                    <img width={100} height={150} src={sl} alt="logo" />
                                    <img width={150} height={150} src={logo} alt="logo" />
                                </div>
                                <h1 style={{ fontFamily: 'cursive', marginBottom: '5px' }}>Sri Lanka Prison Department</h1>
                                <p style={{ marginBottom: '10px' }}>_____________________________________________________________________________________________________________</p>
                            </div>
                            <h1 className="mb-4 text-xl font-bold text-center">Education Details</h1>

                            <div className='r-details'>
                                <p><strong>Program Name:</strong> {educationDetails.programName}</p>
                                <p><strong>Category:</strong> {educationDetails.category}</p>
                                <p><strong>Date:</strong> {new Date(educationDetails.date).toLocaleDateString()}</p>
                                <p><strong>Time:</strong> {educationDetails.time}</p>
                                <p><strong>Location:</strong> {educationDetails.location}</p>
                                <p><strong>Age Group:</strong> {educationDetails.ageGroup}</p>
                                <p><strong>Instructors:</strong> {educationDetails.instructors}</p>
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
                            <button onClick={handlePrint} className='r-print-button' style={{backgroundColor: 'red'}}>Print</button>
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

export default ViewEducation;
