import React, { useState, useEffect } from 'react';
import { Button, Modal, message } from 'antd';
import axios from "axios";
import MergedForm from './MergedForm'; 
import UpdateInmate from './UpdateInmate'; 
import AddWantedInmate from './AddWantedInmate';
import AddReleasedInmate from './AddReleasedInmate';
import InmateMedicalDetails from './InmateMedicalDetails';
import "./CurrentInmatesStyle.css";
import "./pdfStyles.css";
import Content from "../components/Content";
import SideNavbar from "../components/SideNavbar";
import CurrentInmatesPDFDocument from './CurrentInmatePDFDownload';

const URL = "http://localhost:3500/inmate/getcurrentinmates";

const fetchHandler = async () => {
    try {
        const response = await axios.get(URL);
        return response.data; 
    } catch (error) {
        console.error('Error fetching inmates:', error);
        return [];
    }
};

function CurrentInmate() {
    const [isVisibleAddModal, setIsVisibleAddModal] = useState(false);
    const [isVisibleProfileModal, setIsVisibleProfileModal] = useState(false);
    const [isVisiblePDFModal, setIsVisiblePDFModal] = useState(false);
    const [isVisibleUpdateModal, setIsVisibleUpdateModal] = useState(false);
    const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState(false);
    const [currentInmates, setCurrentInmates] = useState([]);
    const [maleCount, setMaleCount] = useState(0);
    const [femaleCount, setFemaleCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedInmate, setSelectedInmate] = useState(null);
    const [isVisibleWantedModal, setIsVisibleWantedModal] = useState(false); 
    const [isVisibleReleasedModal, setIsVisibleReleasedModal] = useState(false);
    const [isVisibleHealthcareAppointmentModal, setIsVisibleHealthcareAppointmentModal] = useState(false);
    const [selectedInmateName, setSelectedInmateName] = useState('');
    const [selectedInmateForDeletion, setSelectedInmateForDeletion] = useState(null);

    useEffect(() => {
        fetchHandler().then(data => {
            setCurrentInmates(data);
            const male = data.filter(inmate => inmate.gender === 'Male').length;
            const female = data.filter(inmate => inmate.gender === 'Female').length;
            setMaleCount(male);
            setFemaleCount(female);
        });
    }, []);
    
    const showAddModal = () => {
        setIsVisibleAddModal(true);
    };

    const showProfileModal = (inmate) => {
        setSelectedInmate(inmate);
        setIsVisibleProfileModal(true);
    };

    const showDeleteModal = (inmate) => {
        setSelectedInmateForDeletion(inmate);
        setIsVisibleDeleteModal(true);
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

    const handleCancelDeleteModal = () => {
        setIsVisibleDeleteModal(false);
        setSelectedInmateForDeletion(null);
    };

    const handleUpdateClick = (inmate) => {
      setSelectedInmate(inmate);
      setIsVisibleUpdateModal(true);
    };

    const handleAddToWantedList = (inmate) => {
      setSelectedInmate(inmate);
      setIsVisibleWantedModal(true);
    };

    const handleAddToReleasedList = (inmate) => {
        setSelectedInmate(inmate);
        setIsVisibleReleasedModal(true);
        
    };

    const handleOpenHealthcareAppointmentModal = (inmate) => {
        setSelectedInmateName(inmate);
        setIsVisibleHealthcareAppointmentModal(true);
    };

    const handleUpdate = async (id, updatedData) => {
        try {
            await axios.put(`http://localhost:3500/inmate/${id}`, updatedData);
            message.success('Inmate details updated successfully.');
            fetchHandler().then(data => setCurrentInmates(data));
            setIsVisibleUpdateModal(false);
        } catch (error) {
            console.error('Error updating inmate details:', error);
            message.error('Failed to update inmate details.');
        }
    };

    const deleteModelHandler = async () => {
        try {
            const response = await axios.delete(`http://localhost:3500/inmate/${selectedInmateForDeletion._id}`);
            console.log('Success:', response.data);
            message.success('Inmate details deleted successfully.');
            setIsVisibleDeleteModal(false);
            fetchHandler().then(data => setCurrentInmates(data));
            setSelectedInmateForDeletion(null); 
        } catch (error) {
            console.error('Error deleting inmate:', error);
            message.error('Failed to delete inmate details.');
        }
    };

    const filteredInmates = currentInmates.filter(inmate => {
        if (inmate) {
            for (let key in inmate) {
                if (inmate[key] && inmate[key].toString().toLowerCase().includes(searchQuery.toLowerCase())) {
                    return true;
                }
            }
        }
        return false;
    });


    return (
        <div className="container">
            <SideNavbar />
            <Content />
            <h1 className="currentInmates">- CURRENT INMATES -</h1>
            <div className="flexContent">
                <div className="countContainer">
                    <p>Total Current Inmates:  {currentInmates.length}</p>
                    <p>Current Male Inmates:   {maleCount}</p>
                    <p>Current Female Inmates: {femaleCount}</p>
                </div>
                <div className="count">
                    <div className="searchContainer">
                        <input
                            className="searchBar"
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <Button type="primary" onClick={showAddModal} className="ButtonAdd">ADD</Button>
            <Modal
                visible={isVisibleAddModal}
                onCancel={handleCancelAddModal}
                footer={null}
                closeIcon={<span className="closeIcon" style={{ color: 'red' }}>X</span>}
                width={700}
                style={{ marginTop: -50, marginBottom: 120 }}
            >
                <MergedForm onUpdate={() => fetchHandler().then(data => setCurrentInmates(data))} />
            </Modal>

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
                        <h2 className="profileTitle">- INMATE DETAILS -</h2>
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
                              <strong className="profile-label">Sentence Duration</strong>
                              <span className="profile-value">:  {selectedInmate.years} years, {selectedInmate.months} months, {selectedInmate.days} days</span>
                          </div>
                          <div className="profile-item">
                              <strong className="profile-label">Cell Number</strong>
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
                          {selectedInmate.escapedDate !== null && (
                                <div className="profile-item">
                                    <strong className="profile-label">Escaped Date</strong>
                                    <span className="profile-value">: {new Date(selectedInmate.escapedDate).toISOString().split('T')[0]}</span>
                                </div>
                            )}
                            {selectedInmate.foundDate !== null && (
                                <div className="profile-item">
                                    <strong className="profile-label">Found Date</strong>
                                    <span className="profile-value">: {new Date(selectedInmate.foundDate).toISOString().split('T')[0]}</span>
                                </div>
                            )}
                      </div>
                      <div className="bottomContainer">
                      <button className="updateInmateProfile" style={{ background : '#4682B4' }} onClick={() => handleUpdateClick(selectedInmate)}>UPDATE</button>

                      <button className="deleteInmateProfile" onClick={() => showDeleteModal(selectedInmate)}>DELETE</button>

                      <button className="wantedProfile" type="primary" onClick={() => handleOpenHealthcareAppointmentModal(selectedInmate.fullname)}>Medical Details</button>
                        
                      <button className="wantedProfile" onClick={() => handleAddToWantedList(selectedInmate)}>Add To Wanted List</button>
                      
                      <button className="releasedProfile" onClick={() => handleAddToReleasedList(selectedInmate)}>Add To Released List</button> 

                      <button className="downloadProfile" onClick={() => showPDFModal(selectedInmate)}>Download Report</button>

                      <Modal
                          visible={isVisibleHealthcareAppointmentModal}
                          onCancel={() => setIsVisibleHealthcareAppointmentModal(false)}
                          footer={null}
                          closeIcon={<span className="closeIcon" style={{ color: 'red' }}>X</span>}
                          width={600}
                          style={{ marginTop: -50, marginBottom: 120 }}
                      >
                          <InmateMedicalDetails
                              inmateName={selectedInmate.fullname}
                              inmateNumber={selectedInmate.inmatenumber}
                              onClose={() => setIsVisibleHealthcareAppointmentModal(false)}
                          />
                      </Modal>


                      <Modal
                          visible={isVisibleReleasedModal}
                          onCancel={() => setIsVisibleReleasedModal(false)}
                          footer={null}
                          closeIcon={<span className="closeIcon" style={{ color: 'red' }}>X</span>}
                          width={450}
                          style={{ marginTop: -50, marginBottom: 120 }}
                      >
                          <AddReleasedInmate
                              selectedInmate={selectedInmate}
                              updateInmate={(id, updatedData) => handleUpdate(id, updatedData)}
                              onClose={() => setIsVisibleReleasedModal(false)}
                              onUpdate={() => fetchHandler().then(data => setCurrentInmates(data))}
                          />
                      </Modal>


                      <Modal
                          visible={isVisibleWantedModal}
                          onCancel={() => setIsVisibleWantedModal(false)}
                          footer={null}
                          closeIcon={<span className="closeIcon" style={{ color: 'red' }}>X</span>}
                          width={450}
                          style={{ marginTop: -50, marginBottom: 120 }}
                      >
                          <AddWantedInmate
                              selectedInmate={selectedInmate}
                              updateInmate={(id, updatedData) => handleUpdate(id, updatedData)}
                              onClose={() => setIsVisibleWantedModal(false)}
                              onUpdate={() => fetchHandler().then(data => setCurrentInmates(data))}
                          />
                      </Modal>

                      </div>
                    </div>
                )}
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
                    <UpdateInmate
                        selectedInmate={selectedInmate}
                        updateInmate={(id, updatedData) => handleUpdate(id, updatedData)}
                        deleteInmate={deleteModelHandler}
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
                  {selectedInmate && <CurrentInmatesPDFDocument selectedInmate={selectedInmate} />}
            </Modal>

            <Modal
                title="Delete Inmate Details"
                visible={isVisibleDeleteModal}
                onCancel={handleCancelDeleteModal}
                onOk={deleteModelHandler}
                okText="Delete"
                cancelText="Cancel"
                okButtonProps={{ style: { backgroundColor: 'red' } }}
            >
                <p>Are you sure you want to delete this inmate?</p>
            </Modal>

            <p className="sentence">(To view additional information about an inmate, simply click on any row in the table.)</p>
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
                        <th>Inmate Number</th>
                        <th>Offense</th>
                        <th>Cell Number</th>
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
                            <td onClick={() => showProfileModal(inmate)}>{inmate.inmatenumber}</td>
                            <td onClick={() => showProfileModal(inmate)}>{inmate.offense}</td>
                            <td onClick={() => showProfileModal(inmate)}>{inmate.cellNumber}</td>
                            <td className="buttonColumn">
                                <button className="update" onClick={() => handleUpdateClick(inmate)}>Update</button>
                                <button className="delete" onClick={() => showDeleteModal(inmate)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CurrentInmate;
