import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StaffMenuBar from '../components/StaffMenuBar';
import { Modal, Button, message } from 'antd';
import AddJailorForm from '../components/AddjailorForm';
import UpdateJailor from '../components/UpdateJailor';
import JailorProfilePDF from './JailorProfilePDF';
import './JailorList.css';

const JailorList = () => {
    const [jailors, setJailors] = useState([]);
    const [filteredJailors, setFilteredJailors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [selectedJailor, setSelectedJailor] = useState(null);
    const [isVisibleJailorProfileModal, setIsVisibleJailorProfileModal] = useState(false);
    const [isVisibleJailorPDFModal, setIsVisibleJailorPDFModal] = useState(false);
    const [isVisibleDeleteJailorModal, setIsVisibleDeleteJailorModal]=useState(false);

    useEffect(() => {
        const fetchJailors = async () => {
            try {
                const response = await axios.get('http://localhost:3500/Jailors');
                setJailors(response.data);
                setFilteredJailors(response.data); // Set filtered jailors initially
            } catch (error) {
                console.error('Error fetching jailors:', error);
            }
        };
        fetchJailors();
    }, []);

    useEffect(() => {
        // Filter jailors based on search query
        const filtered = jailors.filter(jailor =>
            jailor.FirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        jailor.LastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        jailor.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        jailor.NIC.toString().includes(searchQuery)||
        jailor.ContactNumber.toString().includes(searchQuery) //
        );
        setFilteredJailors(filtered);
        setNoResults(filtered.length === 0);
    }, [searchQuery, jailors]);

    const showAddModal = () => {
        setAddModalVisible(true);
    };

    const showPDFModel = (jailor) => {
        setSelectedJailor(jailor);
        setIsVisibleJailorPDFModal(true);
    }

    
 
    const handleCancel = () => {
        setModalVisible(false);
        setAddModalVisible(false);
        setIsVisibleJailorPDFModal(false);
        setSelectedJailor(null);
    };

    const handlePDFCancel = () => {
        setIsVisibleJailorPDFModal(false);
    };

    const showJailorProfileModal = (jailor) => {
        setSelectedJailor(jailor);
        setIsVisibleJailorProfileModal(true);
    };

    const  ShowJailorDeleteModel = (jailor) =>{
        setSelectedJailor(jailor);
        setIsVisibleDeleteJailorModal(true);
    }

    const handleCancelDeleteJailorModal =()=>{
        setIsVisibleDeleteJailorModal(false);
        setSelectedJailor(null);
    }

    const updateJailor = async (id, updatedJailorData) => {
        try {
            await axios.put(`http://localhost:3500/Jailors/${id}, updatedJailorData`);
            const updatedJailors = jailors.map(jailor => {
                if (jailor._id === id) {
                    return { ...jailor, ...updatedJailorData };
                } else {
                    return jailor;
                }
            });
            setJailors(updatedJailors);
            setFilteredJailors(updatedJailors); // Update filtered jailors as well
            setModalVisible(false); // Close modal after update
            setSelectedJailor(null);
            message.success('Jailor updated successfully!'); // Display success message
        } catch (error) {
            console.error('Error updating jailor:', error);
            message.error('Failed to update jailor. Please try again later.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3500/Jailors/${selectedJailor._id}`);
            const updatedJailors = jailors.filter(jailor => jailor._id !== id);
            setJailors(updatedJailors);
            setIsVisibleDeleteJailorModal(false);
            setFilteredJailors(updatedJailors); 

            message.success('Jailor deleted successfully!');
        } catch (error) {
            console.error('Error deleting jailor:', error);
            message.error('Failed to delete jailor. Please try again later.'); 
        }
    };

    const handleUpdate = (jailor) => {
        setSelectedJailor(jailor);
        setModalVisible(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
    };

    const handleSearch = () => {
        const filteredJailors = jailors.filter((jailor) =>
            Object.values(jailor).some((field) =>
                field ? field.toString().toLowerCase().includes(searchQuery.toLowerCase()) : false
            )
        );
        setFilteredJailors(filteredJailors);
        setNoResults(filteredJailors.length === 0);
    };



    return (
        <div>
            <StaffMenuBar />
            <h1 className='AllJailor-h1'>All Jailors</h1>
            <div className='all-jailor'>
                
                <input
                    type="text"
                    className="searchInput"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch} className="searchButton">Search</button>
                <Button type='primary' onClick={showAddModal} className='addbutton'>Add</Button>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date of Birth</th>
                            <th>NIC</th>
                            <th>Contact Number</th>
                            <th>Gender</th>
                            <th>Job Title</th>
                            <th>Department</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredJailors.map((jailor) => (
                            <tr key={jailor._id}>
                                <td onClick={() => showJailorProfileModal(jailor)}>{jailor.FirstName}</td>
                                <td onClick={() => showJailorProfileModal(jailor)}>{jailor.LastName}</td>
                                <td onClick={() => showJailorProfileModal(jailor)}>{formatDate(jailor.DateofBirth)}</td>
                                <td onClick={() => showJailorProfileModal(jailor)}>{jailor.NIC}</td>
                                <td onClick={() => showJailorProfileModal(jailor)}>{jailor.ContactNumber}</td>
                                <td onClick={() => showJailorProfileModal(jailor)}>{jailor.Gender}</td>
                                <td onClick={() => showJailorProfileModal(jailor)}>{jailor.jobTitle}</td>
                                <td>{jailor.Department}</td>
                                <td>
                                    <Button className='update-jailor-button' type='primary' onClick={() => handleUpdate(jailor)}>Update</Button>
                                </td>
                                <td>
                                    <Button className='delete-jailor-button' type='danger' onClick={() => ShowJailorDeleteModel(jailor)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                    width={800}
                >
                    {selectedJailor && (<UpdateJailor selectedJailor={selectedJailor} updateJailor={updateJailor} onUpdate={() => { }} />)}
                </Modal>
                <Modal
                    visible={isAddModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                    width={700}
                >
                    <AddJailorForm/>
                </Modal>
                <Modal
                    visible={isVisibleJailorProfileModal}
                    onCancel={() => setIsVisibleJailorProfileModal(false)}
                    width={800}
                >
                    {selectedJailor && (
                        <>
                            <div>
                                <h2>Jailor Profile</h2>
                                <p>First Name: {selectedJailor.FirstName}</p>
                                <p>Last Name: {selectedJailor.LastName}</p>
                                <p>Date of Birth: {selectedJailor.DateofBirth}</p>
                                <p>NIC: {selectedJailor.NIC}</p>
                                <p>Contact Number: {selectedJailor.ContactNumber}</p>
                                <p>Emergency Contact Number: {selectedJailor.EmergencyContactNumber}</p>
                                <p>Marital Status: {selectedJailor.MaritalStatus}</p>
                                <p>Religion: {selectedJailor.Religion}</p>
                                <p>Gender: {selectedJailor.Gender}</p>
                                <p>Job Title: {selectedJailor.jobTitle}</p>
                                <p>Department: {selectedJailor.Department}</p>
                                <p>StartDate: {selectedJailor.StartDate}</p>
                                <p>Educational Background: {selectedJailor.EducationalBackground}</p>
                                <p>Relevant Certifications: {selectedJailor.RelevantCertifications}</p>
                                <p>Training Courses Completed: {selectedJailor.TrainingCoursesCompleted}</p>
                                <p>Uniform Size: {selectedJailor.UniformSize}</p>
                                <p>Issued Equipment: {selectedJailor.IssuedEquipment}</p>
                                <p>Equipment Training Status: {selectedJailor.EquipmentTrainingStatus}</p>
                                <p>Medical Conditions: {selectedJailor.MedicalConditions}</p>
                                <p>Allergies: {selectedJailor.Allergies}</p>
                                <p>Emergency Medical Information: {selectedJailor.EmergencyMedicalInformation}</p>
                                <Button onClick={()=> showPDFModel(selectedJailor)}>Download PDF</Button>
                            </div>

                            <Modal
                                visible={isVisibleJailorPDFModal}
                                onCancel={handlePDFCancel}
                                footer={null}
                                width={700}
                            >
                                {selectedJailor && <JailorProfilePDF jailor={selectedJailor} />}
                            </Modal>
                        </>
                    )}
                </Modal>
                <Modal
                    title ="Delete Jailor Details"
                    visible = {isVisibleDeleteJailorModal}
                    onCancel={handleCancelDeleteJailorModal}
                    onOk={() => handleDelete(selectedJailor._id)}
                    okText="Delete"
                    cancelText="Cancel"
                    okButtonProps={{style:{backgroundColor: 'red'}}}
                    >
                    <p>Are you sure you want to delete this jailor?</p>
                </Modal>
                {noResults && <p>No results found.</p>}
            </div>
        </div>
    );
};

export default JailorList;