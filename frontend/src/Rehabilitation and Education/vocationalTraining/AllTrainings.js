import React, { useState, useEffect } from 'react';
import RehabilitationSidebar from '../RehabilitationSidebar';
import axios from 'axios';
import { IoEyeOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import AddTraining from './AddTraining';
import UpdateTraining from './UpdateTraining';
import ViewTraining from './ViewTraining';
import ConfirmationModal from '../../confModel/ConfirmationModal';
import '../css/AllTables.css';

const AllTrainings = () => {
    const [trainings, setTrainings] = useState([]); // State to store training records
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showDetailDialog, setShowDetailDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [selectedTrainingId, setSelectedTrainingId] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [deletingTrainingId, setDeletingTrainingId] = useState(null);

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

    // Function to fetch all training records from the API
    const fetchTrainings = async () => {
        try {
            const response = await axios.get('http://localhost:3500/api/vocationaltraining');
            setTrainings(response.data);
        } catch (error) {
            console.error('Error fetching training records:', error);
        }
    };

    useEffect(() => {
        fetchTrainings();
    }, []);

    // Function to filter training records based on search query
    const filteredTrainings = trainings.filter(training =>
        training.trainingName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id) => {
        setDeletingTrainingId(id);
        toggleConfirmationModal();
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3500/api/vocationaltraining/delete/${deletingTrainingId}`);
            fetchTrainings();
            console.log('Training deleted successfully');
        } catch (error) {
            console.error('Error deleting training:', error);
        }
        toggleConfirmationModal();
    };

    const handleUpdate = (id) => {
        setSelectedTrainingId(id);
        toggleUpdateDialog();
    };

    const handleView = (id) => {
        setSelectedTrainingId(id);
        toggleDetailDialog();
    };

    const handleCreate = () => {
        toggleAddDialog();
    };

    return (
        <div className='r-home'>
            <div className='r-container'>
                <RehabilitationSidebar />
                <div>
                    <div className='r-main-content'>
                        <h1 className='r-page-title'>All Vocational Trainings</h1>
                        <div className='r-flex-container'>
                            <div className='r-search-container'>
                                <input
                                    className='r-input-field'
                                    type="text"
                                    placeholder='Search Trainings'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button onClick={toggleAddDialog} className='r-add-button'>Add</button>
                            </div>
                        </div>
                        <div className="r-table-container">
                            <table className="r-custom-table">
                                <thead>
                                    <tr >
                                        <th>Training Name</th>
                                        <th>Field</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Location</th>
                                        <th>Duration (Hours)</th>
                                        <th>Lead Instructor</th>
                                        <th>Max Participants</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm font-normal text-gray-900">
                                    {filteredTrainings.map(training => (
                                        <tr key={training._id} >
                                            <td >{training.trainingName}</td>
                                            <td >{training.vocationalField}</td>
                                            <td >{new Date(training.date).toLocaleDateString()}</td>
                                            <td >{training.time}</td>
                                            <td >{training.location}</td>
                                            <td >{training.durationHours}</td>
                                            <td >{training.leadInstructor}</td>
                                            <td >{training.maxParticipants}</td>
                                            <td id='r-button-icons'>
                                                <button className="" onClick={() => handleView(training._id)}><IoEyeOutline color='green' size={20} /></button>
                                                <button className="" onClick={() => handleUpdate(training._id)}><FaEdit color='blue' size={20} /></button>
                                                <button className="" onClick={() => handleDelete(training._id)}><MdDeleteOutline color='red' size={20} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <AddTraining isOpen={showAddDialog} onClose={toggleAddDialog} refreshList={fetchTrainings} />
            <ViewTraining isOpen={showDetailDialog} onClose={toggleDetailDialog} refreshList={fetchTrainings} trainingId={selectedTrainingId} />
            <UpdateTraining isOpen={showUpdateDialog} onClose={toggleUpdateDialog} refreshList={fetchTrainings} trainingId={selectedTrainingId} />
            <ConfirmationModal
                isOpen={showConfirmationModal}
                onClose={toggleConfirmationModal}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete?"
            />
        </div>
    );
};

export default AllTrainings;
