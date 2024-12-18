import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StaffMenuBar from '../components/StaffMenuBar';
import { Modal, Button, message } from 'antd';
import DoctorForm from './DoctorForm';
import UpdateDoctor from "./UpdateDoctor"
import DoctorProfilePDF from "./doctorProfilePDF"
import "./DoctorList.css"
const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isAddDoctorModalVisible, setAddDoctorModalVisible] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isVisibleDoctorProfileModal, setIsVisibleDoctorProfileModal] = useState(false);
    const [isVisibleDoctorPDFModal, setIsVisibleDoctorPDFModal] = useState(false);
    const [isVisibleDeleteDoctorModal, setIsVisibleDeleteDoctorModal] = useState(false);
    

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:3500/Doctros');
                setDoctors(response.data);
                setFilteredDoctors(response.data);
            } catch (error) {
                console.error('Error fetching Doctors:', error);
            }
        };
        fetchDoctors();
    }, []);

    useEffect(() => {
        const filtered = doctors.filter(doctor =>
            doctor.FirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.LastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.NIC.toString().includes(searchQuery)
        );
        setFilteredDoctors(filtered);
        setNoResults(filtered.length === 0);
    }, [searchQuery, doctors]);

    const showAddModal = () => {
        setAddDoctorModalVisible(true);
    };

    const showPDFModel = (doctor) => {
        setSelectedDoctor(doctor);
        setIsVisibleDoctorPDFModal(true);
    };
    const handleCancel = () => {
        setModalVisible(false);
        setAddDoctorModalVisible(false);
        setIsVisibleDoctorProfileModal(false);
        setSelectedDoctor(null);
    };

    const handlePDFCancel = () => {
        setIsVisibleDoctorPDFModal(false);
    };

    const showDoctorProfileModal = (doctor) => {
        setSelectedDoctor(doctor);
        setIsVisibleDoctorProfileModal(true);
    };


    const  ShowDoctorDeleteModel = (doctor) =>{
        setSelectedDoctor(doctor);
        setIsVisibleDeleteDoctorModal(true);
    }
    const handleCancelDeleteDoctorModal = () => {
        setIsVisibleDeleteDoctorModal(false);
        setSelectedDoctor(null);
    };

    const updateDoctor = async (id, updatedDoctorData) => {
        try {
            await axios.put(`http://localhost:3500/Doctros/${id}`, updatedDoctorData);
            const updatedDoctors = doctors.map(doctor => {
                if (doctor._id === id) {
                    return { ...doctor, ...updatedDoctorData };
                } else {
                    return doctor;
                }
            });
            setDoctors(updatedDoctors);
            setFilteredDoctors(updatedDoctors); 
            setModalVisible(false); 
            setSelectedDoctor(null);
            message.success('Doctor updated successfully!'); 
        } catch (error) {
            console.error('Error updating Doctor:', error);
            message.error('Failed to update Doctor. Please try again later.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3500/Doctros/${selectedDoctor._id}`);
            const updatedDoctors = doctors.filter(doctor => doctor._id !== id);
            setDoctors(updatedDoctors);
            setFilteredDoctors(updatedDoctors);
            setIsVisibleDeleteDoctorModal(false);
            message.success('Doctor deleted successfully!');
        } catch (error) {
            console.error('Error deleting Doctor:', error);
            message.error('Failed to delete Doctor. Please try again later.');
        }
    };

    const handleUpdate = (doctor) => {
        setSelectedDoctor(doctor);
        setModalVisible(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
    };

    const handleSearch = () => {
        const filteredDoctors = doctors.filter((doctor) =>
            Object.values(doctor).some((field) =>
                field ? field.toString().toLowerCase().includes(searchQuery.toLowerCase()) : false
            )
        );
        setFilteredDoctors(filteredDoctors);
        setNoResults(filteredDoctors.length === 0);
    };


    

   

    return (
        <div>
            <StaffMenuBar />
            <h1 className='AllDoctor-h1'>All Doctor</h1>
            <div className='all-Doctor'>
                <input
                    type="text"
                    className="searchInput"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch} className="searchButton">Search</button>
                <Button type='primary' onClick={showAddModal} className='addDoctorButton'>Add</Button>

                

                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date of Birth</th>
                            <th>NIC</th>
                            <th>Contact Number</th>
                            <th>Gender</th>
                            <th>Specialty</th>
                            <th>Medical License Number</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDoctors.map((doctor) => (
                            <tr key={doctor._id} onClick={() => showDoctorProfileModal(doctor)}>
                                <td>{doctor.FirstName}</td>
                                <td>{doctor.LastName}</td>
                                <td>{formatDate(doctor.DateofBirth)}</td>
                                <td>{doctor.NIC}</td>
                                <td>{doctor.ContactNumber}</td>
                                <td>{doctor.Gender}</td>
                                <td>{doctor.Specialty}</td>
                                <td>{doctor.MedicalLicenseNumber}</td>
                                <td>
                                    <Button type='primary' onClick={() => handleUpdate(doctor)} className='update-Doctor-button'>Update</Button>
                                    </td><td>
                                    <Button type='danger' onClick={() => ShowDoctorDeleteModel(doctor)} className='delete-Doctor-button'>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={800}
            >
                {selectedDoctor && (<UpdateDoctor selectedDoctor={selectedDoctor} updateDoctor={updateDoctor} onUpdate={()=>{}} />)}
            </Modal>
            <Modal
                visible={isAddDoctorModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={700}
            >
                <DoctorForm/>
            </Modal>
            <Modal
                visible={isVisibleDoctorProfileModal}
                onCancel={() => setIsVisibleDoctorProfileModal(false)}
                width={800}
            >
                {selectedDoctor && (
                    <>
                        <div>
                            <h2>Doctor Profile</h2>
                            <p>First Name: {selectedDoctor.FirstName}</p>
                            <p>Last Name: {selectedDoctor.LastName}</p>
                            <p>Date of Birth: {selectedDoctor.DateofBirth}</p>
                            <p>NIC: {selectedDoctor.NIC}</p>
                            <p>Contact Number: {selectedDoctor.ContactNumber}</p>
                            <Button onClick={() => showPDFModel(selectedDoctor)}>Download PDF</Button>
                        </div>
                   
            <Modal
visible={isVisibleDoctorPDFModal}
onCancel={handlePDFCancel}
footer={null}
width={700}
>
{selectedDoctor && <DoctorProfilePDF doctor={selectedDoctor} />}
</Modal>
</>
                )}
                </Modal>
            
                <Modal
    title="Delete Doctor Details"
    visible={isVisibleDeleteDoctorModal}
    onCancel={handleCancelDeleteDoctorModal}
    onOk={() => selectedDoctor && handleDelete(selectedDoctor._id)}
    okText="Delete"
    cancelText="Cancel"
    okButtonProps={{ style: { backgroundColor: 'red' } }}
>
    <p>Are you sure you want to delete this Doctor?</p>
</Modal>

            {noResults && <p>No results found.</p>}
        </div>
    );
}

export default DoctorList;
