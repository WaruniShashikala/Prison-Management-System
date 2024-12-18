import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Content from '../components/Content';
import SideNavbar from '../components/SideNavbar';
import { Bar, Pie, Line } from 'react-chartjs-2';
import moment from 'moment';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [currentInmates, setCurrentInmates] = useState([]);
  const [releasedInmates, setReleasedInmates] = useState([]);
  const [wantedInmates, setWantedInmates] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const currentResponse = await axios.get('http://localhost:3500/inmate/getcurrentinmates');
      setCurrentInmates(currentResponse.data.filter(inmate => inmate.status === 'Current'));

      const releasedResponse = await axios.get('http://localhost:3500/inmate/getreleasedinmates');
      setReleasedInmates(releasedResponse.data.filter(inmate => inmate.status === 'Released'));

      const wantedResponse = await axios.get('http://localhost:3500/inmate/getwantedinmates');
      setWantedInmates(wantedResponse.data.filter(inmate => inmate.status === 'Wanted'));
    } catch (error) {
      console.error('Error fetching inmates:', error);
    }
  };

  const countByGender = (inmates, gender) => {
    return inmates.filter(inmate => inmate.gender === gender).length;
  };

  const countInmatesAddedLast7Days = inmates => {
    const today = moment().endOf('day');
    const data = Array(7).fill(0);

    inmates.forEach(inmate => {
      const admissionDate = moment(inmate.admissionDate).endOf('day');
      const daysAgo = today.diff(admissionDate, 'days');
      if (daysAgo >= 0 && daysAgo < 7) {
        data[6 - daysAgo]++;
      }
    });

    return data;
  };

  const totalCurrentInmates = currentInmates.length;
  const totalReleasedInmates = releasedInmates.length;
  const totalWantedInmates = wantedInmates.length;

  const genderData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Current Inmates by Gender',
        data: [countByGender(currentInmates, 'Male'), countByGender(currentInmates, 'Female')],
        backgroundColor: ['#89CFF0', '#FF6384'],
        hoverBackgroundColor: ['#89CFF0', '#FF6384'],
      },
    ],
  };

  const inmatesStatusData = {
    labels: ['Current Inmates', 'Released Inmates', 'Wanted Inmates'],
    datasets: [
      {
        label: 'Total Count',
        data: [totalCurrentInmates, totalReleasedInmates, totalWantedInmates],
        backgroundColor: ['#89CFF0', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#89CFF0', '#FF6384', '#FFCE56'],
      },
    ],
  };

  const inmatesAddedData = {
    labels: [
      moment().subtract(6, 'days').format('MMM D'),
      moment().subtract(5, 'days').format('MMM D'),
      moment().subtract(4, 'days').format('MMM D'),
      moment().subtract(3, 'days').format('MMM D'),
      moment().subtract(2, 'days').format('MMM D'),
      moment().subtract(1, 'days').format('MMM D'),
      moment().format('MMM D')
    ],
    datasets: [
      {
        label: 'Inmates Added',
        data: countInmatesAddedLast7Days(currentInmates),
        backgroundColor: '#FFCE56',
      },
    ],
  };

  return (
    <div>
      <SideNavbar />
      <Content />
      <h1 className="heading">INMATE MANAGEMENT DASHBOARD</h1>
      <div className="allItems">
        <Link to="/current" className="item">
            Current Inmates
            <span className="total">{totalCurrentInmates}</span>
        </Link>
        <Link to="/released" className="item">
          Released Inmates 
          <span className="total">{totalReleasedInmates}</span>
        </Link>
        <Link to="/wanted" className="item">
          Wanted Inmates 
          <span className="total">{totalWantedInmates}</span>
        </Link>
      </div>
      <div className="dashboard-container">
        <div className="chart-card-gender">
          <h2 className="chart-card-gender-title">Current Inmates Overview</h2>
          <div className="pie-chart"><Pie data={genderData} /></div>
        </div>
        <div className="chart-card-inmates">
          <h2 className="chart-card-inmates-title">Inmates Added in Last 7 Days</h2>
          <div className="line-chart"><Line data={inmatesAddedData} /></div>
        </div>
        <div className="chart-card-status">
          <h2 className="chart-card-status-title">Inmates Status</h2>
          <div className="bar-chart"><Bar data={inmatesStatusData} /></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
