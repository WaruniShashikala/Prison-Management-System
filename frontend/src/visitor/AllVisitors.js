import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { IoEyeOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import AddNewVisitor from './addVisitor/AddNewVisitor';
import axios from 'axios';
import VisitorDetails from './VisitorDetails';
import UpdateVisitor from './UpdateVisitor';
import CreateVisit from '../visit/CreateVisit';
import ConfirmationModal from '../conformation/ConfirmationModal';
import { FaCheck } from "react-icons/fa6";
import './CssFiles/AllTables.css';

const AllVisitors = () => {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showDetailDialog, setShowDetailDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [showVisitDialog, setShowVisitDialog] = useState(false);
    const [visitors, setVisitorData] = useState([]);
    const [selectedVisitorId, setSelectedVisitorId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [deletingVisitorId, setDeletingVisitorId] = useState(null);

    const toggleAddDialog = () => setShowAddDialog(!showAddDialog);
    const toggleDetailDialog = () => setShowDetailDialog(!showDetailDialog);
    const toggleUpdateDialog = () => setShowUpdateDialog(!showUpdateDialog);
    const toggleVisitDialog = () => setShowVisitDialog(!showVisitDialog);

    const getAllVisitors = async () => {
        const res = await axios.get('http://localhost:3500/api/visitor');
        setVisitorData(res.data);
    };

    const handleDelete = (id) => {
        setDeletingVisitorId(id);
        setShowConfirmationModal(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3500/api/visitor/delete/${deletingVisitorId}`);
            getAllVisitors();
            console.log('Visitor deleted successfully');
        } catch (error) {
            console.error('Error deleting visitor:', error);
        }
    };

    const handleUpdate = (id) => {
        setSelectedVisitorId(id);
        toggleUpdateDialog();
    };

    const handleView = (id) => {
        setSelectedVisitorId(id);
        toggleDetailDialog();
    };

    const handleCreate = (id) => {
        setSelectedVisitorId(id);
        toggleVisitDialog();
    };

    useEffect(() => {
        getAllVisitors();
    }, []);

    const filteredVisitors = visitors.filter((visitor) =>
        visitor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visitor.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visitor.nic.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='v-home'>
            <div className='v-container'>
                <Sidebar />
                <div className='v-main-content'>
                    <h1 className='v-page-title'>All Visitors</h1>
                    <div className='v-flex-container '>
                        <div className='v-search-container'>
                            <input
                                className='v-input-field'
                                type="text"
                                placeholder='Search Visitors'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                                <button onClick={toggleAddDialog} className='v-add-button'>Add</button>
                        </div>
                    </div>
                    <div className="v-table-container" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'scroll' }}>
                        <table className="v-custom-table">
                            <thead>
                                <tr className="leading-normal text-gray-800 uppercase bg-gray-200 text-md">
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Date of Birth</th>
                                    <th>Gender</th>
                                    <th>NIC</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-normal text-gray-900">
                                {filteredVisitors.map((visitor) => (
                                    <tr key={visitor._id} >
                                        <td>{visitor.firstName}</td>
                                        <td>{visitor.lastName}</td>
                                        <td>{new Date(visitor.dateOfBirth).toLocaleDateString()}</td>
                                        <td>{visitor.gender}</td>
                                        <td>{visitor.nic}</td>
                                        <td id="v-button-icons">
                                            <button  onClick={() => handleView(visitor._id)}><IoEyeOutline color='green' size={20} /></button>
                                            <button  onClick={() => handleUpdate(visitor._id)}><FaEdit color='blue' size={20} /></button>
                                            <button  onClick={() => handleDelete(visitor._id)}><MdDeleteOutline color='red' size={20} /></button>
                                            <button onClick={() => handleCreate(visitor._id)}><FaCheck color='#3f6212' size={20} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <AddNewVisitor isOpen={showAddDialog} onClose={toggleAddDialog} refreshList={getAllVisitors} />
            <VisitorDetails isOpen={showDetailDialog} onClose={toggleDetailDialog} refreshList={getAllVisitors} visitorId={selectedVisitorId} />
            <UpdateVisitor isOpen={showUpdateDialog} onClose={toggleUpdateDialog} refreshList={getAllVisitors} visitorId={selectedVisitorId} />
            <CreateVisit isOpen={showVisitDialog} onClose={toggleVisitDialog} refreshList={getAllVisitors} visitorId={selectedVisitorId} />
            <ConfirmationModal
                isOpen={showConfirmationModal}
                onClose={() => setShowConfirmationModal(false)}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete?"
            />
        </div>
    );
};

export default AllVisitors;
