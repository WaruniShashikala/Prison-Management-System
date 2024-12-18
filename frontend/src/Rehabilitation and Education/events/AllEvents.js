import React, { useState, useEffect } from 'react';
import RehabilitationSidebar from '../RehabilitationSidebar';
import axios from 'axios';
import { IoEyeOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import AddEvent from './AddEvent';
import UpdateEvents from './UpdateEvents';
import ViewEvent from './ViewEvent';
import ConfirmationModal from '../../confModel/ConfirmationModal';
import '../css/AllTables.css';

const AllEvents = () => {
    const [events, setEvents] = useState([]); // State to store event records
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showDetailDialog, setShowDetailDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [deletingEventId, setDeletingEventId] = useState(null);

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

    // Function to fetch all event records from the API
    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3500/api/event');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching event records:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // Function to filter event records based on search query
    const filteredEvents = events.filter(event =>
        event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id) => {
        setDeletingEventId(id);
        toggleConfirmationModal();
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3500/api/event/delete/${deletingEventId}`);
            fetchEvents();
            console.log('Event deleted successfully');
        } catch (error) {
            console.error('Error deleting event:', error);
        }
        toggleConfirmationModal();
    };

    const handleUpdate = (id) => {
        setSelectedEventId(id);
        toggleUpdateDialog();
    };

    const handleView = (id) => {
        setSelectedEventId(id);
        toggleDetailDialog();
    };

    const handleCreate = (id) => {
        setSelectedEventId(id);
        toggleAddDialog();
    };

    return (
        <div className='r-home'>
            <div className='r-container'>
                <RehabilitationSidebar />
                <div>
                    <div className='r-main-content'>
                        <h1 className='r-page-title'>All Events</h1>
                        <div className='r-flex-container'>
                            <div className='r-search-container'>
                                <input
                                    className='r-input-field'
                                    type="text"
                                    placeholder='Search Events'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button onClick={toggleAddDialog} className='r-add-button'>Add</button>
                            </div>

                        </div>
                        <div className="r-table-container" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'scroll' }}>
                            <table className="r-custom-table">
                                <thead>
                                    <tr >
                                        <th >Event Name</th>
                                        <th >Category</th>
                                        <th >Date</th>
                                        <th >Time</th>
                                        <th >Organizer</th>
                                        <th >Target Audience</th>
                                        <th >Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm font-normal text-gray-900">
                                    {filteredEvents.map(event => (
                                        <tr key={event._id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td>{event.eventName}</td>
                                            <td>{event.category}</td>
                                            <td>{new Date(event.date).toLocaleDateString()}</td>
                                            <td>{event.time}</td>
                                            <td>{event.organizer}</td>
                                            <td>{event.targetAudience}</td>
                                            <td id='r-button-icons'>
                                                <button className="" onClick={() => handleView(event._id)}><IoEyeOutline color='green' size={20} /></button>
                                                <button className="" onClick={() => handleUpdate(event._id)}><FaEdit color='blue' size={20} /></button>
                                                <button className="" onClick={() => handleDelete(event._id)}><MdDeleteOutline color='red' size={20} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <AddEvent isOpen={showAddDialog} onClose={toggleAddDialog} refreshList={fetchEvents} />
            <ViewEvent isOpen={showDetailDialog} onClose={toggleDetailDialog} refreshList={fetchEvents} eventId={selectedEventId} />
            <UpdateEvents isOpen={showUpdateDialog} onClose={toggleUpdateDialog} refreshList={fetchEvents} eventId={selectedEventId} />
            <ConfirmationModal
                isOpen={showConfirmationModal}
                onClose={toggleConfirmationModal}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete?"
            />
        </div>
    );
};

export default AllEvents;
