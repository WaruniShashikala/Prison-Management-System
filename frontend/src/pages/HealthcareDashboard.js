import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import Content from "../components/Content";
import HealthcareSideNavbar from "../components/HealthcareSideNavbar";
import "./healthcareDashboard.css";

function HealthcareDashboard() {
    const [appointmentsData, setAppointmentsData] = useState(null);
    const [healthRecordsCount, setHealthRecordsCount] = useState(0);
    const [currentAppointmentsCount, setcurrentAppointmentsCount] = useState(0);
    const [approvedAppointmentsCount, setapprovedAppointmentsCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch count of current appointments for the last 7 days
            const currentAppointmentsResponse = await axios.get("http://localhost:3500/appointment/findall");
            const currentAppointments = currentAppointmentsResponse.data.filter(appointment => {
                return isWithinLast7Days(appointment.appointmentDate);
            });
            const currentAppointmentsCount = currentAppointments.length;
            const allCurrentAppointmentsCount = currentAppointmentsResponse.data.length;
            setcurrentAppointmentsCount(allCurrentAppointmentsCount)

            // Fetch count of approved appointments for the last 7 days
            const approvedAppointmentsResponse = await axios.get("http://localhost:3500/appointment/approved");
            const approvedAppointments = approvedAppointmentsResponse.data.filter(appointment => {
                return isWithinLast7Days(appointment.appointmentDate);
            });
            const approvedAppointmentsCount = approvedAppointments.length;
            const allApprovedAppointmentsCount = approvedAppointmentsResponse.data.length;
            setapprovedAppointmentsCount(allApprovedAppointmentsCount)

            // Fetch count of health records
            const healthRecordsResponse = await axios.get("http://localhost:3500/healthrecord/healthrecords");
            const healthRecordsCount = healthRecordsResponse.data.length;

            setAppointmentsData({
                current: currentAppointmentsCount,
                approved: approvedAppointmentsCount
            });

            setHealthRecordsCount(healthRecordsCount);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again later.');
            setLoading(false);
        }
    };

    const isWithinLast7Days = (dateString) => {
        const appointmentDate = new Date(dateString);
        const today = new Date();
        const differenceInTime = today.getTime() - appointmentDate.getTime();
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays <= 7 && differenceInDays >= 0;
    };

    return (
        <div>
            <HealthcareSideNavbar />
            <Content />
            <h1 className="heading">HEALTHCARE MANAGEMENT DASHBOARD</h1>
            <div >
                <div className="allHealthcareItems">
                    <div className="Dashboard-cards">
                        <Link to="/currentAppointments" className="healthcareitem">
                            <div className="itemname">Current Appointments</div>
                            <span className="itemtotal">{currentAppointmentsCount}</span>
                        </Link>
                        <Link to="/approvedAppointments" className="healthcareitem">
                            <div className='itemname'>Approved Appointments</div>
                            <span className="itemtotal">{approvedAppointmentsCount}</span>
                        </Link>
                        <Link to="/healthRecords" className="healthcareitem">
                            <div className='itemname'>Health Records</div>
                            <span className="itemtotal">{healthRecordsCount}</span>
                        </Link>
                    </div>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {appointmentsData && (
                    <div className="pieChart">
                        <h2 className="pieChartTitle">Appointments Distribution of Last 7 Days</h2>
                        <Pie
                            data={{
                                labels: ['Current Appointments', 'Approved Appointments'],
                                datasets: [{
                                    data: [appointmentsData.current, appointmentsData.approved],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.6)',
                                        'rgba(54, 162, 235, 0.6)'
                                    ],
                                    borderWidth: 1,
                                }]
                            }}
                        />
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}

export default HealthcareDashboard;
