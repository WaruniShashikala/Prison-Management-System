import React from 'react';
import { Link } from 'react-router-dom';
import Summary from '../visit/Summary';
import './CssFiles/TopBar.css'; // Importing external CSS file

const TopBar = () => {
    return (
        <div className='top-bar-container'>
            <div className='flex items-center justify-end'>
            </div>
            <div className='content-container'>
                <h1 className='page-title'>Visitor Management</h1>
                <div className='button-container'>
                    <Link to='/allVisitors'><button className='custom-button'>All Visitors</button></Link>
                    <Link to='/allVisits'><button className='custom-button'>Tracking Time</button></Link>
                    <Link to='/visitorDashboard'><button className='custom-button'>Summary</button></Link>
                </div>
                <div>
                    <Summary/>
                </div>
            </div>
        </div>
    )
}

export default TopBar;
