import React, { useEffect, useState } from 'react';
import Sidebar from '../visitor/Sidebar';
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios';
import ConfirmationModal from '../conformation/ConfirmationModal';
import { toast } from 'react-toastify';
import '../visitor/CssFiles/AllTables.css'

const AllVisits = () => {
    const [visits, setVisitData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [deletingVisitId, setDeletingVisitId] = useState(null);

    const getAllVisits = async () => {
        try {
            const res = await axios.get('http://localhost:3500/api/visit');
            setVisitData(res.data);
        } catch (error) {
            console.error('Error fetching visits:', error);
        }
    }

    const handleDelete = (id) => {
        setDeletingVisitId(id);
        setShowConfirmationModal(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3500/api/visit/delete/${deletingVisitId}`);
            // Remove the deleted visit from the local state
            getAllVisits();
            toast.success('Visit Successfully Deleted ', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            console.log('Visit deleted successfully');
        } catch (error) {
            console.error('Error deleting visit:', error);
        }
    };

    useEffect(() => {
        getAllVisits();
    }, []);

    const filteredVisits = visits.filter(visit =>
        visit.visitorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visit.nic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visit.inmateNo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='v-home'>
            <div className='v-container'>
                <Sidebar />
                <div className='v-main-content'>
                    <h1 className='v-page-title'>All Tracking Details</h1>
                    <div className='v-flex-container'>
                        <div className='v-search-container'>
                            <input
                                className='v-input-field'
                                type="text"
                                placeholder='Search Visits'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />

                        </div>
                    </div>
                    <div className="v-table-container">
                        <table className="v-custom-table ">
                            <thead>
                                <tr >
                                    <th >Visitor Name</th>
                                    <th >NIC</th>
                                    <th >Inmate Number</th>
                                    <th >Date of Visit</th>
                                    <th >Check-in Time</th>
                                    <th >Check-out Time</th>
                                    <th >Duration (mins)</th>
                                    <th >Actions</th>
                                </tr>
                            </thead>
                            <tbody >
                                {filteredVisits.map(visit => (
                                    <tr key={visit._id} >
                                        <td >{visit.visitorName}</td>
                                        <td >{visit.nic}</td>
                                        <td >{visit.inmateNo}</td>
                                        <td >{new Date(visit.dateOfVisit).toLocaleDateString()}</td>
                                        <td >{visit.checkInTime}</td>
                                        <td >{visit.checkOutTime}</td>
                                        <td >{visit.duration}</td>
                                        <td >
                                            <button className="" onClick={() => handleDelete(visit._id)}><MdDeleteOutline color='red' size={20} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ConfirmationModal
                isOpen={showConfirmationModal}
                onClose={() => setShowConfirmationModal(false)}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete?"
            />
        </div>
    )
}

export default AllVisits;
