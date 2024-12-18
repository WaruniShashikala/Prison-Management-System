import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios';
import UpdateSecurityStaff from './UpdateSecurityStaff';
import SecurityStaffSidebar from './SecurityStaffSidebar';
import AddSecurityStaff from './AddSecurityStaff/AddSecurityStaff';
import ViewSecurityStaff from './ViewSecurityStaff';
import ConfirmationModal from '../confModel/ConfirmationModal';
import './AllSecurity.css';

const AllSecurityStaff = () => {

    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showDetailDialog, setShowDetailDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [securityStaffList, setSecurityStaffList] = useState([]);
    const [selectedStaffId, setSelectedStaffId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for confirmation modal
    const [deletingStaffId, setDeletingStaffId] = useState(null); // State to store the id of the staff being deleted

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

    const getAllSecurityStaff = async () => {
        try {
            const res = await axios.get('http://localhost:3500/api/securityStaff/');
            setSecurityStaffList(res.data);
        } catch (error) {
            console.error('Error fetching security staff:', error);
        }
    };

    const handleDelete = async (id) => {
        // Set the id of the staff being deleted
        setDeletingStaffId(id);
        // Open the confirmation modal
        toggleConfirmationModal();
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3500/api/securityStaff/delete/${deletingStaffId}`);
            // Remove the deleted security staff from the local state
            getAllSecurityStaff();
            console.log('Security staff deleted successfully');
        } catch (error) {
            console.error('Error deleting security staff:', error);
        }
        // Close the confirmation modal
        toggleConfirmationModal();
    };

    const handleUpdate = (id) => {
        setSelectedStaffId(id);
        toggleUpdateDialog();
    };

    const handleView = (id) => {
        setSelectedStaffId(id);
        toggleDetailDialog();
    }

    useEffect(() => {
        getAllSecurityStaff();
    }, []);

    const filteredSecurityStaff = securityStaffList.filter(staff =>
        staff.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.nic.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='security-home'>
            <div className='s-container'>
                <SecurityStaffSidebar />
                <div className='main-content'>
                    <h1 className='page-title'>All Security Staff</h1>
                    <div className='flex-container'>
                        <div className='search-container'>
                            <input
                                className='input-field'
                                type="text"
                                placeholder='Search Security Staff'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div>
                                <button className='add-button' onClick={toggleAddDialog}>Add</button>
                            </div>
                        </div>
                    </div>
                    <div className="table-container" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'scroll' }}>
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Date of Birth</th>
                                    <th>Gender</th>
                                    <th>NIC</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSecurityStaff.map(staff => (
                                    <tr key={staff._id}>
                                        <td>{staff.firstName}</td>
                                        <td>{staff.lastName}</td>
                                        <td>{new Date(staff.dateOfBirth).toLocaleDateString()}</td>
                                        <td>{staff.gender}</td>
                                        <td>{staff.nic}</td>
                                        <td id="button-icons">
                                            <button onClick={() => handleView(staff._id)}><IoEyeOutline color='green' size={20} /></button>
                                            <button onClick={() => handleUpdate(staff._id)}><FaEdit color='blue' size={20} /></button>
                                            <button onClick={() => handleDelete(staff._id)}><MdDeleteOutline color='red' size={20} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <AddSecurityStaff isOpen={showAddDialog} onClose={toggleAddDialog} refreshList={getAllSecurityStaff} />
            <ViewSecurityStaff isOpen={showDetailDialog} onClose={toggleDetailDialog} refreshList={getAllSecurityStaff} staffId={selectedStaffId} />
            <UpdateSecurityStaff isOpen={showUpdateDialog} onClose={toggleUpdateDialog} refreshList={getAllSecurityStaff} securityStaffId={selectedStaffId} />
            <ConfirmationModal
                isOpen={showConfirmationModal}
                onClose={toggleConfirmationModal}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete?"
            />
        </div>

    )
}

export default AllSecurityStaff;
