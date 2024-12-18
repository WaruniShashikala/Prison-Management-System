import React, { useState, useEffect } from 'react';
import RehabilitationSidebar from '../RehabilitationSidebar';
import axios from 'axios';
import { IoEyeOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import AddEducation from './AddEducation';
import ViewEducation from './ViewEducation';
import UpdateEducation from './UpdateEducation';
import ConfirmationModal from '../../confModel/ConfirmationModal';
import '../css/AllTables.css';

const AllEducations = () => {
    const [educations, setEducations] = useState([]); // State to store education records
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showDetailDialog, setShowDetailDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [selectedEducationId, setSelectedEducationId] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [deletingEducationId, setDeletingEducationId] = useState(null);

    const toggleAddDialog = () => {
        setShowAddDialog(!showAddDialog);
    };

    const toggleDetailDialog = () => {
        setShowDetailDialog(!showDetailDialog);
    };

    const toggleUpdateDialog = () => {
        setShowUpdateDialog(!showUpdateDialog);
    };

    const toggleConfirmationModal = () => {
        setShowConfirmationModal(!showConfirmationModal);
    };

    // Function to fetch all education records from the API
    const fetchEducations = async () => {
        try {
            const response = await axios.get('http://localhost:3500/api/education'); // Adjust the API endpoint as per your backend route
            setEducations(response.data);
        } catch (error) {
            console.error('Error fetching education records:', error);
        }
    };

    useEffect(() => {
        fetchEducations();
    }, []);

    // Function to filter education records based on search query
    const filteredEducations = educations.filter(education =>
        education.programName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id) => {
        setDeletingEducationId(id);
        toggleConfirmationModal();
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3500/api/education/delete/${deletingEducationId}`);
            // Remove the deleted education from the local state
            fetchEducations();
            console.log('Education deleted successfully');
        } catch (error) {
            console.error('Error deleting education:', error);
        }
        toggleConfirmationModal(); // Close the confirmation modal after deletion
    };

    const handleUpdate = (id) => {
        setSelectedEducationId(id);
        toggleUpdateDialog();
    };

    const handleView = (id) => {
        setSelectedEducationId(id);
        toggleDetailDialog();
    };

    const handleCreate = (id) => {
        setSelectedEducationId(id);
        toggleAddDialog();
    };

    return (
        <div className='r-home'>
            <div className='r-container '>
                <RehabilitationSidebar />
                <div>
                    <div className='r-main-content'>
                        <h1 className='r-page-title'>All Educations</h1>
                        <div className='r-flex-container'>
                            <div className='r-search-container'>
                                <input
                                    className='r-input-field'
                                    type="text"
                                    placeholder='Search Educations'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button onClick={toggleAddDialog} className='r-add-button'>Add</button>
                            </div>
                        </div>
                        <div className="r-table-container" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'scroll' }}>
                            <table className="r-custom-table">
                                <thead>
                                    <tr className="">
                                        <th >Program Name</th>
                                        <th >Category</th>
                                        <th >Date</th>
                                        <th >Time</th>
                                        <th >Location</th>
                                        <th >Age Group</th>
                                        <th >Instructors</th>
                                        <th >Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm font-normal text-gray-900">
                                    {filteredEducations.map(education => (
                                        <tr key={education._id} className="">
                                            <td>{education.programName}</td>
                                            <td>{education.category}</td>
                                            <td>{new Date(education.date).toLocaleDateString()}</td>
                                            <td>{education.time}</td>
                                            <td>{education.location}</td>
                                            <td>{education.ageGroup}</td>
                                            <td>{education.instructors}</td>
                                            <td id='r-button-icons'>
                                                <button  onClick={() => handleView(education._id)}><IoEyeOutline color='green' size={20} /></button>
                                                <button  onClick={() => handleUpdate(education._id)}><FaEdit color='blue' size={20} /></button>
                                                <button  onClick={() => handleDelete(education._id)}><MdDeleteOutline color='red' size={20} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <AddEducation isOpen={showAddDialog} onClose={toggleAddDialog} refreshList={fetchEducations} />
            <ViewEducation isOpen={showDetailDialog} onClose={toggleDetailDialog} refreshList={fetchEducations} educationId={selectedEducationId} />
            <UpdateEducation isOpen={showUpdateDialog} onClose={toggleUpdateDialog} refreshList={fetchEducations} educationId={selectedEducationId} />
            <ConfirmationModal
                isOpen={showConfirmationModal}
                onClose={toggleConfirmationModal}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete?"
            />
        </div>
    );
};

export default AllEducations;
