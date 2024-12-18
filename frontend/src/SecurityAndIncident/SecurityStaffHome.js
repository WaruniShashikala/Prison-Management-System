import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineMenuBook } from "react-icons/md";
import { GiPoliceOfficerHead } from "react-icons/gi";
import './SecurityStaffHome.css'; 

const SecurityStaffHome = () => {
  return (
    <div className='security-home-container'>
      <div className='grid-container'>
        <Link to="/allSecurityStaff" className='grid-item'>
          <div className='card security-staff-card'>
            <GiPoliceOfficerHead color='black' size={50} />
            <p className='card-text'>Security Staff</p>
          </div>
        </Link>
        <Link to="/allIncidents" className='grid-item'>
          <div className='card incident-reporting-card'>
            <MdOutlineMenuBook color='black' size={50} />
            <p className='card-text'>Incident Reporting</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default SecurityStaffHome;
