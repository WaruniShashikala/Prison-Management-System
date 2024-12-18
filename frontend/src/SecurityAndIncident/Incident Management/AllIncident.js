import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoEyeOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import UpdateIncident from './UpdateIncident';
import SecurityStaffSidebar from '../SecurityStaffSidebar';
import AddIncident from './AddIncident';
import ViewIncident from './ViewIncident';
import ConfirmationModal from '../../confModel/ConfirmationModal';
import '../AllSecurity.css'

const AllIncident = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [incidentList, setIncidentList] = useState([]);
  const [selectedIncidentId, setSelectedIncidentId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deletingIncidentId, setDeletingIncidentId] = useState(null);

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

  const getAllIncidents = async () => {
    try {
      const res = await axios.get('http://localhost:3500/api/incident/');
      setIncidentList(res.data);
    } catch (error) {
      console.error('Error fetching incidents:', error);
    }
  };

  const handleDelete = async (id) => {
    setDeletingIncidentId(id);
    toggleConfirmationModal();
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3500/api/incident/delete/${deletingIncidentId}`);
      getAllIncidents();
      console.log('Incident deleted successfully');
    } catch (error) {
      console.error('Error deleting incident:', error);
    }
    toggleConfirmationModal();
  };

  const handleUpdate = (id) => {
    setSelectedIncidentId(id);
    toggleUpdateDialog();
  };

  const handleView = (id) => {
    setSelectedIncidentId(id);
    toggleDetailDialog();
  };

  useEffect(() => {
    getAllIncidents();
  }, []);

  const filteredIncidents = incidentList.filter(incident =>
    incident.incidentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    incident.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='security-home'>
      <div className='s-container'>
        <SecurityStaffSidebar />
        <div className='main-content'>
          <h1 className='page-title'>All Incidents</h1>
          <div className='flex-container '>
            <div className='search-container'>
              <input
                className='input-field'
                type="text"
                placeholder='Search Incidents'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className='flex items-center justify-end gap-4'>
                <button onClick={toggleAddDialog} className='add-button'>Add</button>
              </div>
            </div>
          </div>
          <div className="table-container" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'scroll' }}>
            <table className="custom-table">
              <thead>
                <tr >
                  <th>Reported By</th>
                  <th>Incident Type</th>
                  <th>Date of Incident</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {filteredIncidents.map(incident => (
                  <tr key={incident._id} className="">
                    <td>{incident.reportedBy}</td>
                    <td>{incident.incidentType}</td>
                    <td>{new Date(incident.dateOfIncident).toLocaleDateString()}</td>
                    <td>{incident.location}</td>
                    <td id="button-icons">
                      <button onClick={() => handleView(incident._id)}><IoEyeOutline color='green' size={20} /></button>
                      <button onClick={() => handleUpdate(incident._id)}><FaEdit color='blue' size={20} /></button>
                      <button onClick={() => handleDelete(incident._id)}><MdDeleteOutline color='red' size={20} /></button>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AddIncident isOpen={showAddDialog} onClose={toggleAddDialog} refreshList={getAllIncidents} />
      <ViewIncident isOpen={showDetailDialog} onClose={toggleDetailDialog} refreshList={getAllIncidents} incidentId={selectedIncidentId} />
      <UpdateIncident isOpen={showUpdateDialog} onClose={toggleUpdateDialog} refreshList={getAllIncidents} incidentId={selectedIncidentId} />
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={toggleConfirmationModal}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete?"
      />
    </div>
  )
}

export default AllIncident;
