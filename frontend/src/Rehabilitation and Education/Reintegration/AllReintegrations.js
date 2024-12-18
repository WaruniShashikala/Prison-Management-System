import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { IoEyeOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import AddReintegration from './AddReintegration';
import UpdateReintegration from './UpdateReintegration';
import ViewReintegration from './ViewReintegration';
import RehabilitationSidebar from '../RehabilitationSidebar';
import ConfirmationModal from '../../confModel/ConfirmationModal';
import '../css/AllTables.css';

const AllReintergrations = () => {
    const [reintegrations, setReintegrations] = useState([]); // State to store reintegration records
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showDetailDialog, setShowDetailDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [selectedReintegrationId, setSelectedReintegrationId] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [deletingReintegrationId, setDeletingReintegrationId] = useState(null);

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

    // Function to fetch all reintegration records from the API
    const fetchReintegrations = async () => {
        try {
            const response = await axios.get('http://localhost:3500/api/registration/');
            setReintegrations(response.data);
        } catch (error) {
            console.error('Error fetching reintegration records:', error);
        }
    };

    useEffect(() => {
        fetchReintegrations();
    }, []);

    // Function to filter reintegration records based on search query
    const filteredReintegrations = reintegrations.filter(reintegration =>
        reintegration.recordName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id) => {
        setDeletingReintegrationId(id);
        toggleConfirmationModal();
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3500/api/registration/delete/${deletingReintegrationId}`);
            fetchReintegrations();
            console.log('Reintegration deleted successfully');
        } catch (error) {
            console.error('Error deleting reintegration:', error);
        }
        toggleConfirmationModal();
    };

    const handleUpdate = (id) => {
        setSelectedReintegrationId(id);
        toggleUpdateDialog();
    };

    const handleView = (id) => {
        setSelectedReintegrationId(id);
        toggleDetailDialog();
    };

    const handleCreate = () => {
        toggleAddDialog();
    };

    return (
        <div className='r-home'>
            <div className='r-container'>
                <RehabilitationSidebar/>
                <div>
                    <div className='r-main-content'>
                        <h1 className='r-page-title'>All Reintegrations</h1>
                        <div className='r-flex-container'>
                            <div className='r-search-container'>
                                <input
                                    className='r-input-field'
                                    type="text"
                                    placeholder='Search Reintegrations'
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
                                        <th>Record Name</th>
                                        <th>Record Type</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Program Location</th>
                                        <th>Program Coordinator</th>
                                        <th>Preferred Language</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm font-normal text-gray-900">
                                    {filteredReintegrations.map(reintegration => (
                                        <tr key={reintegration._id} >
                                            <td >{reintegration.recordName}</td>
                                            <td >{reintegration.recordType}</td>
                                            <td >{new Date(reintegration.startDate).toLocaleDateString()}</td>
                                            <td >{new Date(reintegration.endDate).toLocaleDateString()}</td>
                                            <td >{reintegration.programLocation}</td>
                                            <td >{reintegration.programCoordinator}</td>
                                            <td >{reintegration.preferredLanguage}</td>
                                            <td id='r-button-icons'>
                                                <button className="" onClick={() => handleView(reintegration._id)}><IoEyeOutline color='green' size={20} /></button>
                                                <button className="" onClick={() => handleUpdate(reintegration._id)}><FaEdit color='blue' size={20} /></button>
                                                <button className="" onClick={() => handleDelete(reintegration._id)}><MdDeleteOutline color='red' size={20} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <AddReintegration isOpen={showAddDialog} onClose={toggleAddDialog} refreshList={fetchReintegrations} />
            <ViewReintegration isOpen={showDetailDialog} onClose={toggleDetailDialog} refreshList={fetchReintegrations} reintegrationId={selectedReintegrationId} />
            <UpdateReintegration isOpen={showUpdateDialog} onClose={toggleUpdateDialog} refreshList={fetchReintegrations} reintegrationId={selectedReintegrationId} />
            <ConfirmationModal
                isOpen={showConfirmationModal}
                onClose={toggleConfirmationModal}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete?"
            />
        </div>
    );
};

export default AllReintergrations;
