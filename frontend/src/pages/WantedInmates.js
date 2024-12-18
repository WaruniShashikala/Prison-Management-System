import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Button, Modal, message } from 'antd';
import Content from "../components/Content";
import SideNavbar from "../components/SideNavbar";
import UpdateWantedInmate from './UpdateWantedInmate'; 
import WantedToCurrentInmate from './wantedToCurrentForm'; 
import WantedInmatesPDFDocument from './WantedInmatesPdfDocument';
import './ReleasedInmatesStyle.css';
import "./pdfStyles.css";

const fetchWantedInmates = async () => {
    try {
        const response = await axios.get('http://localhost:3500/inmate/getwantedinmates');
        return response.data;
    } catch (error) {
        console.error('Error fetching wanted inmates:', error);
        return [];
    }
};

function WantedInmates(){
    const [wantedInmates, setWantedInmates] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedInmate, setSelectedInmate] = useState(null);
    const [maleCount, setMaleCount] = useState(0);
    const [femaleCount, setFemaleCount] = useState(0);
    const [isVisibleProfileModal, setIsVisibleProfileModal] = useState(false);

    const [isVisibleAddModal, setIsVisibleAddModal] = useState(false);
    const [isVisiblePDFModal, setIsVisiblePDFModal] = useState(false);
    const [isVisibleUpdateModal, setIsVisibleUpdateModal] = useState(false);
    const [currentInmates, setCurrentInmates] = useState([]);
    const [isVisibleCurrentModal, setIsVisibleCurrentModal] = useState(false);

    useEffect(() => {
        fetchWantedInmates().then(data => {
            setWantedInmates(data);
            const male = data.filter(inmate => inmate.gender === 'Male').length;
            const female = data.filter(inmate => inmate.gender === 'Female').length;
            setMaleCount(male);
            setFemaleCount(female);
        });
    }, []);

    const showProfileModal = (inmate) => {
        setSelectedInmate(inmate);
        setIsVisibleProfileModal(true);
    };

    const showPDFModal = (inmate) => {
      setSelectedInmate(inmate);
      setIsVisiblePDFModal(true);
    };

    const handleCancelAddModal = () => {
        setIsVisibleAddModal(false);
    };

    const handleCancelProfileModal = () => {
        setIsVisibleProfileModal(false);
    };

    const handleAddToCurrentList = (inmate) => {
        setSelectedInmate(inmate);
        setIsVisibleCurrentModal(true);
    };

    const handleUpdateClick = (inmate) => {
        setSelectedInmate(inmate);
        setIsVisibleUpdateModal(true);
      };

    const filteredInmates = wantedInmates.filter(inmate => {
        if (inmate) {
            for (let key in inmate) {
                if (inmate[key] && inmate[key].toString().toLowerCase().includes(searchQuery.toLowerCase())) {
                    return true;
                }
            }
        }
        return false;
    });

    const handleUpdate = async (id, updatedData) => {
        try {
            await axios.put(`http://localhost:3500/inmate/${id}`, updatedData);
            message.success('Inmate is added to current list successfully.');
            fetchWantedInmates().then(data => setCurrentInmates(data));
            setIsVisibleUpdateModal(false);
        } catch (error) {
            console.error('Error updating inmate details:', error);
            message.error('Failed to update inmate details.');
        }
    };

    const updateWantedInmate = async (id, updatedData) => {
        try {
            await axios.put(`http://localhost:3500/inmate/${id}`, updatedData);
            message.success('Wanted Inmate details updated successfully.');
            fetchWantedInmates().then(data => setWantedInmates(data));
            setIsVisibleUpdateModal(false);
        } catch (error) {
            console.error('Error updating inmate details:', error);
            message.error('Failed to update inmate details.');
        }
    };

    const deleteWantedInmate = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this wanted inmate?');
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:3500/inmate/${id}`);
                const updatedWantedInmates = wantedInmates.filter(inmate => inmate._id !== id);
                setWantedInmates(updatedWantedInmates);
                alert('Wanted inmate deleted successfully.');
            } catch (error) {
                console.error('Error deleting wanted inmate:', error);
                alert('Failed to delete wanted inmate.');
            }
        }
    };

    return(
        <div className="container">
            <SideNavbar />
            <Content />
            <h1 className="releasedInmates">- WANTED INMATES -</h1>
            <div className="flexContent">
                <div className="releasedcountContainer">
                    <p>Total Wanted Inmates: {wantedInmates.length}</p>
                    <p>Wanted Male Inmates: {maleCount}</p>
                    <p>Wanted Female Inmates: {femaleCount}</p>
                </div>
                <div className="count">
                    <div className="releasedsearchContainer">
                        <input
                            className="releasedsearchBar"
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        
                    </div>
                </div>
            </div>


            
            <Modal
                visible={isVisibleProfileModal}
                onCancel={handleCancelProfileModal}
                footer={null}
                closeIcon={<span className="closeIcon" style={{ color: 'red' }}>X</span>}
                width={630}
                style={{ marginTop: -50}}
            >
                {selectedInmate && (
                    <div className="profileContainer">
                        <h2 className="releasedprofileTitle">- WANTED INMATE DETAILS -</h2>
                        {selectedInmate.image ? (
                            <img className="image" src={`http://localhost:3500/uploads/${selectedInmate.image}`} alt="Inmate Photo" style={{ marginLeft: '230px', width: '120px', height: '150px' }} />
                        ) : (
                            'No Image Available'
                        )}
                        <h3 className="subtopic1">- Personal Information -</h3>
                        <div className="profile-container">
                          <div className="profile-item">
                              <strong className="profile-label">Full Name</strong>
                              <span className="profile-value">:  {selectedInmate.fullname}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Name with Initials</strong>
                              <span className="profile-value">:  {selectedInmate.initialname}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Date of Birth</strong>
                              <span className="profile-value">:  {selectedInmate.birthday ? new Date(selectedInmate.birthday).toISOString().split('T')[0] : ''}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Gender</strong>
                              <span className="profile-value">:  {selectedInmate.gender}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">NIC</strong>
                              <span className="profile-value">:  {selectedInmate.nic}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Address</strong>
                              <span className="profile-value">:  {selectedInmate.address}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Contact Number</strong>
                              <span className="profile-value">:  {selectedInmate.contactnumber}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Emergency Contact Name</strong>
                              <span className="profile-value">:  {selectedInmate.emergencycontactname}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Emergency Contact Number</strong>
                              <span className="profile-value">:  {selectedInmate.emergencycontactnumber}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Marital Status</strong>
                              <span className="profile-value">:  {selectedInmate.marital}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Occupation</strong>
                              <span className="profile-value">:  {selectedInmate.occupation}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Education Level</strong>
                              <span className="profile-value">:  {selectedInmate.education}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Religion</strong>
                              <span className="profile-value">:  {selectedInmate.religion}</span>
                          </div>
                          <h3 className="subtopic2">- Admission & Release Details -</h3>
                          <div className="profile-item">
                              <strong className="profile-label">Inmate Number</strong>
                              <span className="profile-value">:  {selectedInmate.inmatenumber}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Offense</strong>
                              <span className="profile-value">:  {selectedInmate.offense}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Sentence</strong>
                              <span className="profile-value">:  {selectedInmate.sentence}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Admission Date</strong>
                              <span className="profile-value">:  {selectedInmate.admissionDate ? new Date(selectedInmate.admissionDate).toISOString().split('T')[0] : ''}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Estimated Release Date</strong>
                              <span className="profile-value">:  {selectedInmate.releaseDate ? new Date(selectedInmate.releaseDate).toISOString().split('T')[0] : ''}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Estimated Sentence Duration</strong>
                              <span className="profile-value">:  {selectedInmate.years} years, {selectedInmate.months} months, {selectedInmate.days} days</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Stayed Cell Number</strong>
                              <span className="profile-value">:  {selectedInmate.cellNumber}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Medical Conditions</strong>
                              <span className="profile-value">:  {selectedInmate.medicalConditions}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Additional Notes</strong>
                              <span className="profile-value">:  {selectedInmate.additionalNotes}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Escaped Date</strong>
                              <span className="profile-value">:  {selectedInmate.escapedDate ? new Date(selectedInmate.escapedDate).toISOString().split('T')[0] : ''}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Escaped Time</strong>
                              <span className="profile-value">:  {selectedInmate.escapedTime}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Escaped Location</strong>
                              <span className="profile-value">:  {selectedInmate.escapedLocation}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Physical Description (Height, Weight, Distinguishing features)</strong>
                              <span className="profile-value">:  {selectedInmate.physicalDescription}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Clothing description at the time of escape (if known)</strong>
                              <span className="profile-value">:  {selectedInmate.clothingDescription}</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Inmate Status</strong>
                              <span className="profile-value">:  {selectedInmate.status}</span>
                          </div>
                      </div>
                      <div className="bottomContainer">
                        
                      <button className="wantedProfile" onClick={() => handleAddToCurrentList(selectedInmate)}>Add To Current List</button>

                      <button className="downloadProfile" onClick={() => showPDFModal(selectedInmate)}>Download Report</button>

                      </div>
                    </div>
                )}
            </Modal>

            <Modal
                visible={isVisibleCurrentModal}
                onCancel={() => { setIsVisibleCurrentModal(false) }}
                footer={null}
                closeIcon={<span className="closeIcon" style={{ color: 'red' }}>X</span>}
                width={450}
                style={{ marginTop: -50, marginBottom: 120 }}
            >
                {selectedInmate && (
                    <WantedToCurrentInmate
                        selectedInmate={selectedInmate}
                        updateInmate={(id, updatedData) => handleUpdate(id, updatedData)}
                        deleteInmate={deleteWantedInmate}
                        onUpdate={(updatedData) => setSelectedInmate(updatedData)}
                        setImage={(file) => console.log('Set image:', file)} 
                    />
                )}
            </Modal>

            <Modal
                  visible={isVisiblePDFModal}
                  onCancel={() => setIsVisiblePDFModal(false)}
                  footer={null}
                  closeIcon={<span className="closeIcon" style={{ color: 'red' }}>X</span>}
                  width={800}
                >
                  {selectedInmate && <WantedInmatesPDFDocument selectedInmate={selectedInmate} />}
            </Modal>

            <Modal
                visible={isVisibleUpdateModal}
                onCancel={() => { setIsVisibleUpdateModal(false) }}
                footer={null}
                closeIcon={<span className="closeIcon" style={{ color: 'red' }}>X</span>}
                width={600}
                style={{ marginTop: -50, marginBottom: 120 }}
            >
                {selectedInmate && (
                    <UpdateWantedInmate
                        selectedInmate={selectedInmate}
                        updateInmate={(id, updatedData) => updateWantedInmate(id, updatedData)}
                        deleteInmate={deleteWantedInmate}
                        onUpdate={(updatedData) => setSelectedInmate(updatedData)}
                        setImage={(file) => console.log('Set image:', file)} 
                    />
                )}
            </Modal>


            <table className="inmatesTable">
                <thead>
                    <tr>
                        <th>Inmate Photo</th>
                        <th>Full Name</th>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                        <th>NIC</th>
                        <th>Address</th>
                        <th>Contact Number</th>
                        <th>Escaped Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredInmates.map(inmate => (
                        <tr key={inmate._id}>
                            <td onClick={() => showProfileModal(inmate)}>
                                {inmate.image ? (
                                    <img src={`http://localhost:3500/uploads/${inmate.image}`} alt="Inmate Photo" style={{ width: '100px', height: '120px' }} />
                                ) : (
                                    'No Image Available'
                                )}
                            </td>
                            <td onClick={() => showProfileModal(inmate)}>{inmate.fullname}</td>
                            <td onClick={() => showProfileModal(inmate)}>{inmate.birthday ? new Date(inmate.birthday).toISOString().split('T')[0] : ''}</td>
                            <td onClick={() => showProfileModal(inmate)}>{inmate.gender}</td>
                            <td onClick={() => showProfileModal(inmate)}>{inmate.nic}</td>
                            <td onClick={() => showProfileModal(inmate)}>{inmate.address}</td>
                            <td onClick={() => showProfileModal(inmate)}>{inmate.contactnumber}</td>
                            <td onClick={() => showProfileModal(inmate)}>
                                {inmate.escapedDate ? (
                                    new Date(inmate.escapedDate).toISOString().split('T')[0]
                                ) : (
                                    ''
                                )}
                            </td>
                            <td onClick={() => showProfileModal(inmate)}>{inmate.status}</td>
                            <td>
                                <button className="delete" onClick={() => deleteWantedInmate(inmate._id)}>Delete</button>
                                <button className="update" onClick={() => handleUpdateClick(inmate)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default WantedInmates;