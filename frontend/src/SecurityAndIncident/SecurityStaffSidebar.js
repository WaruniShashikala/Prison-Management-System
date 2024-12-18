import React from 'react';
import { Link } from 'react-router-dom';
import './SecurityStaffSidebar.css'; 

const SecurityStaffSidebar = () => {
  return (
    <div className='custom-sidebar'>
        <Link to="/securityStaffDashboard">
          <h1 className='sidebar-heading'>Security Dashboard</h1>
        </Link>
        <hr className='sidebar-divider' />
        <ul className='sidebar-menu'>
          <Link to="/allSecurityStaff"><li className='sidebar-item'>Security Staff</li></Link>
          <Link to="/allIncidents"><li className='sidebar-item'>Incident Reporting</li></Link>
        </ul>
    </div>
  );
}

export default SecurityStaffSidebar;
