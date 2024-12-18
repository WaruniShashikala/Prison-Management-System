import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Sidebar.css';

const RehabilitationSidebar = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const handleExpand = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className='custm-sidebar'>
      <div>
        <Link to="/rehabilitationDashboard">
          <h1 className='sidebr-heading'>Rehabilitation Dashboard</h1>
        </Link>
        <hr className='sidebr-divider' />
        <ul className='sidebr-menu'>
          <li className='sidebr-item event' onClick={() => handleExpand('events')}>
            Events
          </li>
          {expandedSection === 'events' && (
            <ul className='sidebr-menu'>
              <Link to="/upcommongEvents"><li>Upcoming</li></Link>
              <Link to="/pastEvents"><li>Past</li></Link>
              <Link to="/allEvents"><li>All</li></Link>
            </ul>
          )}
          <li className='sidebr-item' onClick={() => handleExpand('education')}>
            Education
          </li>
          {expandedSection === 'education' && (
            <ul className='sidebr-menu'>
              <Link to="/allEducation"><li>All Educations</li></Link>
            </ul>
          )}
          <Link to="/allTrainings"><li className='sidebr-item'>Vocational</li></Link>
          <Link to="/allReintegrations"><li className='sidebr-item'>Reintegration</li></Link>
        </ul>
      </div>
    </div>
  );
}

export default RehabilitationSidebar;
