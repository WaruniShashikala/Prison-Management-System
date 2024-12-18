import React from 'react'
import TopBar from './Topbar'
import RehabilitationSidebar from './RehabilitationSidebar'
import RehabilitationHome from './RehabilitationHome'
import './css/RehabilitationHome.css'

const RehabilitationDashboard = () => {
  return (
    <div >
        <div style={{display: 'flex'}}>
            <RehabilitationSidebar/>
            <div className='home-db'>
                <TopBar/>
                <RehabilitationHome/>
            </div>
        </div>
    </div>
  )
}

export default RehabilitationDashboard