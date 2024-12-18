import React from 'react'
import { Link } from 'react-router-dom';
import './CssFiles/VisitorSidebar.css';

const Sidebar = () => {
  return (
    <div className='v-custm-sidebar'>
        <div>
            <Link to="/visitorDashboard"><h1 className='v-sidebr-heading'>Visitor Dashboard</h1></Link>
            <hr className='v-sidebr-divider'/>
            <ul className='v-sidebr-menu'>
                <Link to="/allVisitors"><li className='v-sidebr-item'>All Visitor Details</li></Link>
                <Link to="/allVisits"><li className='v-sidebr-item'>Tracking Time</li></Link>
                <Link to="/summaryChart"><li className='v-sidebr-item'>Summary</li></Link>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar