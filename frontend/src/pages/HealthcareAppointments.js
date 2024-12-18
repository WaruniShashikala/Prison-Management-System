import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Content from "../components/Content";
import SideNavbar from "../components/SideNavbar";
import "./Dashboard.css";
import "./currentAppointments.css";

function HealthcareAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get("http://localhost:3500/appointment/findall");
            setAppointments(response.data);
            setFilteredAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const filtered = appointments.filter(appointment =>
            (appointment.fullname && appointment.fullname.toLowerCase().includes(event.target.value.toLowerCase())) ||
            (appointment.inmatenumber && typeof appointment.inmatenumber === 'string' && appointment.inmatenumber.toLowerCase().includes(event.target.value.toLowerCase())) ||
            (appointment.reason && appointment.reason.toLowerCase().includes(event.target.value.toLowerCase())) ||
            (appointment.notes && appointment.notes.toLowerCase().includes(event.target.value.toLowerCase())) ||
            (appointment.appointmentDate && typeof appointment.appointmentDate === 'string' && appointment.appointmentDate.toLowerCase().includes(event.target.value.toLowerCase()))
        );
        setFilteredAppointments(filtered);
    };
    
    

    const currentAppointmentCount = appointments.length;

    const handleApprove = async (id) => {
        try {
            console.log("Approving appointment with ID:", id);
            await axios.put(`http://localhost:3500/appointment/update/${id}`);
            

           
            setFilteredAppointments(prevFilteredAppointments => prevFilteredAppointments.filter(appointment => appointment._id !== id));
            alert('Appointment has been approved successfully!');
        } catch (error) {
            console.error('Error approving appointment:', error);
        }
    };
    
    
    

    const handleCancel = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to cancel this appointment?');
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:3500/appointment/delete/${id}`);
                // Update the appointments state to remove the deleted appointment
                setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment._id !== id));
                // Update the filteredAppointments state to remove the deleted appointment
                setFilteredAppointments(prevFilteredAppointments => prevFilteredAppointments.filter(appointment => appointment._id !== id));
                alert('Appointment has been cancelled successfully!');
            } catch (error) {
                console.error('Error cancelling appointment:', error);
            }
        }
    };
    

    return (
        <div>
            <SideNavbar />
            <Content />
            <div className="appointmentContainer">

                <h1>- Recently Created Appointments before Approve -</h1>
                <div className="search-bar">
                    <div className="total-appointments">
                        Total Recently Created Appointments: {currentAppointmentCount}
                    </div>
                        <input
                            className="searchbar"
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                </div>
            
                <table>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Inmate Number</th>
                            <th>Reason</th>
                            <th>Appointment Date</th>
                            <th>Notes</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.map(appointment => (
                            <tr key={appointment._id}>
                                <td>{appointment.fullname}</td>
                                <td>{appointment.inmatenumber}</td>
                                <td>{appointment.reason}</td>
                                <td>{appointment.appointmentDate ? new Date(appointment.appointmentDate).toISOString().split('T')[0] : ''}</td>
                                <td>{appointment.notes}</td>
                                <td>
                                    <button className="approveButton" >Update</button>
                                </td>
                                <td>
                                    <button className="cancelButton" onClick={() => handleCancel(appointment._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default HealthcareAppointments;
