import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Content from "../components/Content";
import HealthcareSideNavbar from "../components/HealthcareSideNavbar";
import HealthRecordForm from './HealthRecordForm';
import UpdateHealthRecordForm from './UpdateHealthRecordForm'; 
import ViewHealthRecordModal from './ViewHealthRecordModal';
import { Modal, message } from 'antd';
import "./Dashboard.css";
import "./healthrecords.css";

function AllHealthRecords() {
    const [healthRecords, setHealthRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isVisibleAddModal, setIsVisibleAddModal] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [selectedInmate, setSelectedInmate] = useState(null);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [selectedRecordForView, setSelectedRecordForView] = useState(null);

    useEffect(() => {
        fetchHealthRecords();
    }, []);

    const fetchHealthRecords = async () => {
        try {
            const response = await axios.get("http://localhost:3500/healthrecord/healthrecords");
            setHealthRecords(response.data);
            setFilteredRecords(response.data);
        } catch (error) {
            console.error('Error fetching health records:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const filtered = healthRecords.filter(record =>
            record.InmateName.toLowerCase().includes(event.target.value.toLowerCase()) ||
            record.diagnosis.toLowerCase().includes(event.target.value.toLowerCase()) ||
            record.medications.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredRecords(filtered);
    };

    const showAddModal = () => {
        setIsVisibleAddModal(true);
    };

    const handleCancelAddModal = () => {
        setIsVisibleAddModal(false);
    };

    const showDeleteModal = (record) => {
        setRecordToDelete(record);
        setIsModalVisible(true);
    };

    const handleOkDeleteModal = async () => {
        try {
            const response = await axios.delete(`http://localhost:3500/healthrecord/deletehealthrecords/${recordToDelete._id}`);
            console.log('Success:', response.data);
            message.success('Health record deleted successfully');
            setIsModalVisible(false);
            fetchHealthRecords();
        } catch (error) {
            console.error('Error:', error.response.data);
            message.error('Failed to delete health record');
        }
    };

    const handleCancelDeleteModal = () => {
        setIsModalVisible(false);
    };

    const showUpdateModal = (record) => {
        setSelectedInmate(record);
        setIsUpdateModalVisible(true);
    };

    const handleCancelUpdateModal = () => {
        setIsUpdateModalVisible(false);
    };

    const showViewModal = (record) => {
        setSelectedRecordForView(record);
        setViewModalVisible(true);
    };

    const handleCancelViewModal = () => {
        setViewModalVisible(false);
    };

    return (
        <div>
            <HealthcareSideNavbar />
            <Content />
        <div className="healthrecordContainer">
            
            <div className="healthheader">
                <h1>All Health Records</h1>
            </div>
            <div className='healthflex'>
                <p className='totalhealthrecords'>Total Health Records: {healthRecords.length}</p>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button type="primary" className="healthrecordAdd" onClick={showAddModal}>Add</button>
                    <Modal
                        visible={isVisibleAddModal}
                        onCancel={handleCancelAddModal}
                        footer={null}
                        closeIcon={<span className="close">X</span>}
                        width={500}
                        style={{ marginTop: -50, marginBottom: 120 }}
                    >
                        <HealthRecordForm />
                    </Modal>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Inmate Name</th>
                        <th>Date of Birth</th>
                        <th>Diagnosis</th>
                        <th>Medications</th>
                        <th>Notes</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRecords.map(record => (
                        <tr key={record._id}>
                            <td>{record.InmateName}</td>
                            <td>{record.dateOfBirth ? new Date(record.dateOfBirth).toISOString().split('T')[0] : ''}</td>
                            <td>{record.diagnosis}</td>
                            <td>{record.medications}</td>
                            <td>{record.notes}</td>
                            <td>{record.date ? new Date(record.date).toISOString().split('T')[0] : ''}</td>
                            <td>
                                <button className='HealthrecordView' onClick={() => showViewModal(record)}>View</button>
                                <button className='HealthrecordUpdate' onClick={() => showUpdateModal(record)}>Update</button>
                                <button className='HealthrecordDelete' onClick={() => showDeleteModal(record)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal
                title="Delete Health Record"
                visible={isModalVisible}
                onOk={handleOkDeleteModal}
                onCancel={handleCancelDeleteModal}
            >
                <p>Are you sure you want to delete this health record?</p>
            </Modal>
            <ViewHealthRecordModal
                visible={viewModalVisible}
                onCancel={handleCancelViewModal}
                record={selectedRecordForView}
            />
            <UpdateHealthRecordForm
                visible={isUpdateModalVisible}
                onCancel={handleCancelUpdateModal}
                healthRecord={selectedInmate}
                fetchHealthRecords={fetchHealthRecords}
            />
        </div>
        </div>
    );
}

export default AllHealthRecords;
